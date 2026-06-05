'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import styles from './LeadForm.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-]{7,15}$/;

function validateField(name, value) {
  if (!value || !value.trim()) return 'This field is required';
  if (name === 'email' && !EMAIL_RE.test(value.trim())) return 'Please enter a valid email address';
  if ((name === 'phone' || name === 'mobile') && !PHONE_RE.test(value.trim())) return 'Please enter a valid phone number';
  return null;
}

export default function LeadForm({
  title,
  description,
  bullets = [],
  fields = [],
  submitLabel = 'Submit',
  onSubmit,
}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const newErrors = {};
    fields.forEach((field) => {
      const err = validateField(field.name, formData[field.name] || '');
      if (err) newErrors[field.name] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('submitting');
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerError(err?.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <section className={styles.formSection}>
        <div className={styles.formGrid}>
          <div className={styles.feedbackSuccess}>
            <h2>Thank You!</h2>
            <p>We have received your request. Our team will get back to you shortly.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.formSection}>
      <div className={styles.formGrid}>
        <AnimatedSection direction="left">
          <div className={styles.formInfo}>
            <h2>{title}</h2>
            <p>{description}</p>
            {bullets.length > 0 && (
              <div className={styles.infoBullets}>
                {bullets.map((bullet, i) => (
                  <div key={i} className={styles.infoBullet}>
                    <span className={styles.infoBulletIcon}>{bullet.icon || '•'}</span>
                    <span>{bullet.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
            {serverError && <div className={styles.feedbackError}>{serverError}</div>}

            {fields.map((field) => (
              <div key={field.name} className={styles.formGroup}>
                <label htmlFor={`lead-${field.name}`}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={`lead-${field.name}`}
                    className={errors[field.name] ? styles.error : ''}
                    placeholder={field.placeholder || ''}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    disabled={status === 'submitting'}
                  />
                ) : (
                  <input
                    id={`lead-${field.name}`}
                    type={field.type || 'text'}
                    className={errors[field.name] ? styles.error : ''}
                    placeholder={field.placeholder || ''}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    disabled={status === 'submitting'}
                  />
                )}
                {errors[field.name] && <p className={styles.formError}>{errors[field.name]}</p>}
              </div>
            ))}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : submitLabel}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
