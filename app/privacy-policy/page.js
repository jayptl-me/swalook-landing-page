'use client';
import Link from 'next/link';
import styles from '@/components/PolicyPage.module.css';

export default function PrivacyPolicy() {
  return (
    <div className={styles.policyPage}>
      <div className={styles.policyContainer}>
        <div className={styles.policyBreadcrumb}>
          <Link href="/">Home</Link><span>/</span><span>Privacy Policy</span>
        </div>
        <h1 className={styles.policyTitle}>Privacy Policy</h1>
        <p className={styles.policyDate}>Last updated: June 23, 2026</p>
        <div className={styles.policyContent}>

          <p>
            This Privacy Policy explains how <strong>SWALOOK GLOBAL PRIVATE LIMITED</strong> (&ldquo;Swalook,&rdquo; 
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, and protects your 
            personal data when you use our website, mobile application, and salon management platform 
            (collectively, the &ldquo;Service&rdquo;). It complies with the <strong>Digital Personal Data 
            Protection Act, 2023 (DPDP Act)</strong> and the <strong>Information Technology Act, 2000</strong> 
            along with the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or 
            Information) Rules, 2011.
          </p>
          <p>
            By using the Service, you consent to the practices described in this policy. If you do not agree, 
            please discontinue use immediately.
          </p>

          <h2>1. Definitions</h2>
          <ul>
            <li><strong>Data Fiduciary:</strong> SWALOOK GLOBAL PRIVATE LIMITED, which determines the purpose and means of processing personal data.</li>
            <li><strong>Data Principal:</strong> You, the individual whose personal data is being processed.</li>
            <li><strong>Personal Data:</strong> Any data about an individual who is identifiable by or in relation to such data.</li>
            <li><strong>Service:</strong> The Swalook SaaS platform, website (swalook.in), and mobile application.</li>
            <li><strong>Data Processor:</strong> Third-party service providers who process data on our behalf (e.g., cloud hosting, analytics).</li>
          </ul>

          <h2>2. Information We Collect</h2>

          <h3>A. Information You Provide</h3>
          <ul>
            <li><strong>Account Information:</strong> Salon/business name, your full name, email address, phone number, business address, GST number (if applicable).</li>
            <li><strong>Customer Data:</strong> When you use Swalook to manage your salon, you may store information about your clients including names, phone numbers, email addresses, appointment history, service preferences, and visit notes. You are the Data Fiduciary for this data.</li>
            <li><strong>Staff Information:</strong> Names, contact details, role/designation, attendance records, and performance data of your employees.</li>
            <li><strong>Billing Information:</strong> Payment details, invoice history, and transaction records. We do not store full credit/debit card numbers — these are processed by PCI-compliant payment gateways.</li>
            <li><strong>Communications:</strong> Information you provide when contacting us for support, booking a demo, or filling in forms.</li>
          </ul>

          <h3>B. Information Collected Automatically</h3>
          <ul>
            <li><strong>Usage Data:</strong> IP address, browser type and version, device type, operating system, pages visited, time and date of access, time spent on pages, and referral URLs.</li>
            <li><strong>Cookies & Tracking:</strong> We use essential cookies for authentication and security, and analytics cookies (with your consent) to improve the Service. See Section 5 for details.</li>
            <li><strong>Log Data:</strong> Server logs that record technical information about your use of the Service.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your personal data only for lawful purposes connected to providing the Service:</p>
          <ul>
            <li>To create and manage your account.</li>
            <li>To provide, maintain, and improve the Swalook platform.</li>
            <li>To process transactions and send invoices/receipts.</li>
            <li>To communicate with you about your account, updates, support requests, and service announcements.</li>
            <li>To send marketing communications (only with your consent; you may opt out at any time).</li>
            <li>To detect, prevent, and address technical issues, fraud, or abuse.</li>
            <li>To comply with legal obligations under Indian law.</li>
          </ul>

          <h2>4. Legal Basis for Processing (DPDP Act 2023)</h2>
          <p>
            Under the DPDP Act 2023, we process your personal data based on:
          </p>
          <ul>
            <li><strong>Consent:</strong> You have provided clear consent for us to process your personal data for specific purposes.</li>
            <li><strong>Contractual Necessity:</strong> Processing is necessary to perform our obligations under the Terms of Service.</li>
            <li><strong>Legal Obligation:</strong> Processing is necessary to comply with applicable laws and regulations.</li>
          </ul>

          <h2>5. Cookies and Tracking Technologies</h2>
          <p>We use the following categories of cookies:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for authentication, session management, and security. These cannot be disabled.</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how you use the Service so we can improve it (e.g., page views, feature usage).</li>
          </ul>
          <p>
            You can manage cookie preferences through your browser settings. Disabling certain cookies may affect 
            the functionality of the Service.
          </p>

          <h2>6. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal data. We may share your data only in the following circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating the Service (cloud hosting by AWS/Azure, payment processing, email delivery, analytics). These providers are contractually bound to protect your data.</li>
            <li><strong>Legal Compliance:</strong> When required by law, court order, or government agency under Indian law.</li>
            <li><strong>Business Transfer:</strong> In the event of a merger, acquisition, or asset sale, your data may be transferred — we will notify you and ensure continued protection.</li>
            <li><strong>Consent:</strong> With your explicit consent for any other purpose.</li>
          </ul>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary to fulfil the purposes for which it was collected, 
            or as required by applicable Indian law:
          </p>
          <ul>
            <li>Account data: Retained until your account is deleted or deactivated.</li>
            <li>Customer data (your salon clients): Retained per your instructions or until you delete it.</li>
            <li>Transaction records: Retained for 8 years as required by Indian tax laws.</li>
            <li>Usage logs: Retained for up to 6 months.</li>
          </ul>
          <p>
            Upon termination of your account, we will delete or anonymize your personal data within 90 days, 
            except where retention is required by law.
          </p>

          <h2>8. Data Subject Rights (Your Rights Under DPDP Act 2023)</h2>
          <p>As a Data Principal under the DPDP Act 2023, you have the following rights:</p>
          <ul>
            <li><strong>Right to Access:</strong> Request a summary of your personal data we hold.</li>
            <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete personal data.</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data, subject to legal exceptions.</li>
            <li><strong>Right to Grievance Redressal:</strong> Lodge a complaint about our data handling practices.</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time — this will not affect the lawfulness of processing before withdrawal.</li>
            <li><strong>Right to Data Portability:</strong> Request a copy of your data in a structured, commonly used format.</li>
          </ul>
          <p>To exercise any of these rights, email us at <a href="mailto:privacy@swalook.in">privacy@swalook.in</a>. We will respond within 30 days as required by law.</p>

          <h2>9. Data Security</h2>
          <p>
            We implement reasonable security practices and procedures as required under the IT Act, 2000 and DPDP 
            Act 2023, including:
          </p>
          <ul>
            <li>Encryption of data in transit (TLS 1.2+) and at rest (AES-256).</li>
            <li>Access controls and authentication for all systems.</li>
            <li>Regular security audits and vulnerability assessments.</li>
            <li>Employee training on data protection and confidentiality.</li>
          </ul>
          <p>
            However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute 
            security but will notify you within 72 hours of becoming aware of any data breach that affects your 
            personal data, as required by law.
          </p>

          <h2>10. Data Breach Notification</h2>
          <p>
            In the event of a data breach that is likely to cause harm to Data Principals, we will:
          </p>
          <ul>
            <li>Notify the Data Protection Board of India as required under DPDP Act 2023.</li>
            <li>Notify affected users within 72 hours of discovery.</li>
            <li>Provide details of the breach, potential impact, and remediation steps.</li>
          </ul>

          <h2>11. Data Processors and Cross-Border Data Transfers</h2>
          <p>
            We use cloud infrastructure providers located in India and other jurisdictions. Under the DPDP Act 2023, 
            cross-border transfers of personal data are permitted only to countries notified by the Central Government. 
            We ensure that any cross-border data transfers comply with applicable legal requirements.
          </p>

          <h2>12. Children's Privacy</h2>
          <p>
            Our Service is not directed at individuals under 18 years of age. We do not knowingly collect personal 
            data from minors. If we become aware that a minor has provided us with personal data, we will delete it 
            promptly. Under the DPDP Act 2023, processing of children's data requires verifiable parental consent.
          </p>

          <h2>13. Grievance Officer</h2>
          <p>
            As required under the DPDP Act 2023 and IT Rules, 2011, we have appointed a Grievance Officer:
          </p>
          <ul>
            <li><strong>Name:</strong> [Name of Grievance Officer]</li>
            <li><strong>Email:</strong> <a href="mailto:grievance@swalook.in">grievance@swalook.in</a></li>
            <li><strong>Address:</strong> SWALOOK GLOBAL PRIVATE LIMITED, Aishwaryam, Gaur City-2, Greater Noida West, Sector 16C, Noida, Gautam Buddha Nagar, Uttar Pradesh — 201301</li>
          </ul>
          <p>
            Any grievance or complaint regarding the handling of personal data may be raised with the Grievance 
            Officer, who will acknowledge receipt within 24 hours and resolve the grievance within 30 days.
          </p>

          <h2>14. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy to reflect changes in our practices or applicable laws. We will notify 
            you of material changes via email or a notice on the Service. The &ldquo;Last updated&rdquo; date at the 
            top indicates when the policy was last revised.
          </p>

          <h2>15. Contact Us</h2>
          <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices:</p>
          <ul>
            <li>Email: <a href="mailto:privacy@swalook.in">privacy@swalook.in</a></li>
            <li>Grievance: <a href="mailto:grievance@swalook.in">grievance@swalook.in</a></li>
            <li>Website: <a href="https://swalook.in">https://swalook.in</a></li>
            <li>Address: SWALOOK GLOBAL PRIVATE LIMITED, Aishwaryam, Gaur City-2, Greater Noida West, Sector 16C, Noida, Gautam Buddha Nagar, Uttar Pradesh — 201301</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
