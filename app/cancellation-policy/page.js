'use client';
import Link from 'next/link';
import styles from '@/components/PolicyPage.module.css';

export default function CancellationPolicy() {
  return (
    <div className={styles.policyPage}>
      <div className={styles.policyContainer}>
        <div className={styles.policyBreadcrumb}>
          <Link href="/">Home</Link><span>/</span><span>Cancellation Policy</span>
        </div>
        <h1 className={styles.policyTitle}>Cancellation Policy</h1>
        <p className={styles.policyDate}>Last updated: April 12, 2025</p>
        <div className={styles.policyContent}>
          <p>At SWALOOK GLOBAL PRIVATE LIMITED, we value our customers and aim to provide a fair and transparent cancellation process. Please read the following policy carefully before placing your order.</p>

          <h2>General Cancellation Terms</h2>
          <ul>
            <li>Cancellations will be accepted only if the request is made within 1–2 days of placing the order.</li>
            <li>Orders that have already been processed, packed, or shipped cannot be cancelled.</li>
            <li>Cancellation requests for perishable items (such as flowers, eatables, etc.) will not be accepted.</li>
          </ul>

          <h2>Damaged or Defective Products</h2>
          <ul>
            <li>If you receive a damaged or defective product, please notify our Customer Service Team within 1–2 days of delivery.</li>
            <li>The complaint will be verified, and once confirmed, the cancellation, replacement, or refund process will be initiated.</li>
          </ul>

          <h2>Product Not as Described</h2>
          <ul>
            <li>If the product delivered is different from what was shown on the website or does not meet your expectations, please contact our Customer Service Team within 1–2 days of delivery.</li>
            <li>After reviewing the issue, our team will decide whether the order is eligible for cancellation, replacement, or refund.</li>
          </ul>

          <h2>Products with Manufacturer Warranty</h2>
          <p>For products that come with a manufacturer warranty, cancellation or replacement requests should be directed to the manufacturer as per their terms.</p>

          <h2>Refunds on Cancellation</h2>
          <ul>
            <li>If your cancellation request is approved, the refund will be initiated within 1–2 business days.</li>
            <li>Refunds will be processed to your original method of payment.</li>
          </ul>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Cancellation Policy, You can contact us:</p>
          <ul>
            <li>By email: <a href="mailto:info@swalook.in">info@swalook.in</a></li>
            <li>By visiting our website: <a href="https://swalook.in/">https://swalook.in/</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
