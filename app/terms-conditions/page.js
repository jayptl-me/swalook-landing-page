'use client';
import Link from 'next/link';
import styles from '@/components/PolicyPage.module.css';

export default function TermsConditions() {
  return (
    <div className={styles.policyPage}>
      <div className={styles.policyContainer}>
        <div className={styles.policyBreadcrumb}>
          <Link href="/">Home</Link><span>/</span><span>Terms &amp; Conditions</span>
        </div>
        <h1 className={styles.policyTitle}>Terms &amp; Conditions</h1>
        <p className={styles.policyDate}>Last updated: April 12, 2025</p>
        <div className={styles.policyContent}>
          <p>Welcome to Swalook! These Terms &amp; Conditions (&quot;Terms&quot;) govern your access and use of the Swalook website and mobile app. By using Swalook, you agree to these Terms.</p>

          <h2>1. Use of Services</h2>
          <p>You agree to use Swalook only for lawful salon business purposes and in accordance with all applicable laws.</p>

          <h2>2. User Accounts</h2>
          <ul>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree to provide accurate and complete information.</li>
            <li>You are responsible for all activities that occur under your account.</li>
          </ul>

          <h2>3. Subscription &amp; Payments</h2>
          <ul>
            <li>Swalook services may include free and paid plans.</li>
            <li>Payments must be made according to selected plans.</li>
            <li>No refunds are provided for partial usage unless required by law.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>All content, trademarks, logos, and software are the property of Swalook and may not be copied or reproduced without permission.</p>

          <h2>5. Restrictions</h2>
          <p>You may not:</p>
          <ul>
            <li>Reverse-engineer the platform.</li>
            <li>Use the services for unlawful or fraudulent activities.</li>
            <li>Upload harmful or offensive content.</li>
          </ul>

          <h2>6. Termination</h2>
          <p>We may suspend or terminate your access if you violate these Terms or misuse our platform.</p>

          <h2>7. Limitation of Liability</h2>
          <p>Swalook is not liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>

          <h2>8. Modifications</h2>
          <p>We may update these Terms from time to time. Continued use of Swalook means you accept any updates.</p>

          <h2>9. Governing Law</h2>
          <p>These Terms shall be governed by the laws of India.</p>

          <h2>10. Contact</h2>
          <p>For any questions regarding these Terms, contact <a href="mailto:info@swalook.in">info@swalook.in</a></p>
        </div>
      </div>
    </div>
  );
}
