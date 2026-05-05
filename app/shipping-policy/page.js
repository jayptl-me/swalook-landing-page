'use client';
import Link from 'next/link';
import styles from '@/components/PolicyPage.module.css';

export default function ShippingPolicy() {
  return (
    <div className={styles.policyPage}>
      <div className={styles.policyContainer}>
        <div className={styles.policyBreadcrumb}>
          <Link href="/">Home</Link><span>/</span><span>Shipping Policy</span>
        </div>
        <h1 className={styles.policyTitle}>Shipping Policy</h1>
        <p className={styles.policyDate}>Last updated: April 12, 2025</p>
        <div className={styles.policyContent}>
          <p>At SWALOOK GLOBAL PRIVATE LIMITED, we are committed to delivering your orders in a timely and reliable manner. Please review the details of our shipping policy below:</p>

          <h2>Domestic Shipping</h2>
          <ul>
            <li>For domestic buyers, orders are shipped through registered courier companies and/or India Speed Post.</li>
            <li>Orders are shipped within 1–2 business days of order confirmation and payment, or as per the delivery date agreed at the time of confirmation.</li>
            <li>Delivery timelines are subject to courier company or postal service norms, and may vary depending on the destination.</li>
          </ul>

          <h2>International Shipping</h2>
          <ul>
            <li>For international buyers, orders are shipped through registered international courier companies and/or International Speed Post.</li>
            <li>Shipping timelines depend on the courier service and destination country regulations.</li>
          </ul>

          <h2>Order Processing &amp; Delivery</h2>
          <ul>
            <li>SWALOOK GLOBAL PRIVATE LIMITED guarantees to hand over consignments to the courier/postal authorities within 1–2 business days from the date of order and payment.</li>
            <li>We are not liable for any delays in delivery caused by courier companies or postal authorities.</li>
            <li>All orders will be delivered to the address provided by the buyer at the time of order placement.</li>
          </ul>

          <h2>Service Delivery</h2>
          <p>Confirmation of service delivery will be sent to your registered email ID as specified during registration.</p>

          <h2>Contact Us</h2>
          <p>For any issues related to shipping or service delivery, you may reach us at:</p>
          <ul>
            <li>Email: <a href="mailto:info@swalook.in">info@swalook.in</a></li>
            <li>Website: <a href="https://swalook.in/">https://swalook.in/</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
