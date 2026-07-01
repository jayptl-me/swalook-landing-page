'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiRefreshCw, FiCheck } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/components/FormSection.module.css';
import { validateField, submitForm } from '@/lib/formHelpers';

const FIELDS = ['name', 'salonName', 'mobile', 'email', 'city'];
const FIELDS_OPTIONAL = ['branches', 'businessType'];

const initialForm = { name: '', salonName: '', mobile: '', email: '', city: '', branches: '', businessType: '' };

export default function BookDemoPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  const handleChange = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }
  }, [touched]);

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (!FIELDS_OPTIONAL.includes(field)) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, form[field]) }));
    }
  }, [form]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasError = false;
    const allTouched = {};
    for (const field of FIELDS) {
      const err = validateField(field, form[field]);
      newErrors[field] = err;
      allTouched[field] = true;
      if (err) hasError = true;
    }
    setErrors(newErrors);
    setTouched(allTouched);
    if (hasError) return;

    setStatus('submitting');
    setSubmitError('');

    try {
      await submitForm('/api/book-demo', form);
      setStatus('success');
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }, [form]);

  if (status === 'success') {
    return (
      <>
        <PageHero
          label="Book Demo"
          title="See Swalook in Action"
          highlight="Grow your salon with better retention, smarter marketing, and fewer no-shows."
        />
        <section className={`${styles.formSection} ${styles.tealAccent}`}>
          <div className={styles.formGrid}>
            <AnimatedSection direction="left">
              <div className={styles.formInfo}>
                <h2>Book Your Free Demo</h2>
                <p>See how Swalook helps you manage customers, appointments, marketing, and branch performance from one place.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className={styles.successState}>
                <div className={styles.successIcon}><FiCheck /></div>
                <h3>Thank You!</h3>
                <p>Your demo request has been received. Our team will reach out within 24 hours.</p>
                <Link href="/" className="btn btn-primary">Go to Home</Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        label="Book Demo"
        title="See Swalook in Action"
        highlight="Grow your salon with better retention, smarter marketing, and fewer no-shows."
        description="Book a free demo to see how Swalook can help your beauty business grow with one simple platform."
      />

      <section className={`${styles.formSection} ${styles.tealAccent}`}>
        <div className={styles.formGrid}>
          <AnimatedSection direction="left">
            <div className={styles.formInfo}>
              <h2>Book Your Free Demo</h2>
              <p>
                See how Swalook helps you manage customers, appointments, marketing, and branch performance from one place.
              </p>
              <div className={styles.infoBullets}>
                <div className={styles.infoBullet}>
                  <FiCheckCircle className={styles.infoBulletIcon} />
                  <span>Improve repeat visits with better retention and follow-up.</span>
                </div>
                <div className={styles.infoBullet}>
                  <FiCheckCircle className={styles.infoBulletIcon} />
                  <span>Reduce no-shows with reminders, confirmations, and automation.</span>
                </div>
                <div className={styles.infoBullet}>
                  <FiCheckCircle className={styles.infoBulletIcon} />
                  <span>Track staff, sales, and branch performance with clarity.</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <label>Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={errors.name && touched.name ? styles.fieldError : ''}
                />
                {errors.name && touched.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Salon Name *</label>
                <input
                  type="text"
                  placeholder="Salon name"
                  value={form.salonName}
                  onChange={e => handleChange('salonName', e.target.value)}
                  onBlur={() => handleBlur('salonName')}
                  className={errors.salonName && touched.salonName ? styles.fieldError : ''}
                />
                {errors.salonName && touched.salonName && <span className={styles.errorText}>{errors.salonName}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.mobile}
                  onChange={e => handleChange('mobile', e.target.value)}
                  onBlur={() => handleBlur('mobile')}
                  className={errors.mobile && touched.mobile ? styles.fieldError : ''}
                />
                {errors.mobile && touched.mobile && <span className={styles.errorText}>{errors.mobile}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={errors.email && touched.email ? styles.fieldError : ''}
                />
                {errors.email && touched.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>City *</label>
                <input
                  type="text"
                  placeholder="Your city"
                  value={form.city}
                  onChange={e => handleChange('city', e.target.value)}
                  onBlur={() => handleBlur('city')}
                  className={errors.city && touched.city ? styles.fieldError : ''}
                />
                {errors.city && touched.city && <span className={styles.errorText}>{errors.city}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Number Of Branches</label>
                <input type="text" placeholder="1" value={form.branches} onChange={e => handleChange('branches', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Business Type</label>
                <input type="text" placeholder="Salon, spa, studio, clinic" value={form.businessType} onChange={e => handleChange('businessType', e.target.value)} />
              </div>
              {submitError && <p className={styles.errorText} style={{ marginBottom: 12 }}>{submitError}</p>}
              <button
                type="submit"
                className={`${styles.submitBtn} ${status === 'submitting' ? styles.submitBtnLoading : ''}`}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <><FiRefreshCw className={styles.spinner} /> Booking...</>
                ) : 'Book Demo'}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
