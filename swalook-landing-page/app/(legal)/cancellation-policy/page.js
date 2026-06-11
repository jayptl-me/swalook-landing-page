'use client';
import PolicyPageLayout from '@/components/legal/PolicyPageLayout';

export default function CancellationPolicy() {
  return (
    <PolicyPageLayout title="Cancellation & Refund Policy" lastUpdated="April 12, 2025">
      <p>At SWALOOK GLOBAL PRIVATE LIMITED, we strive to provide a transparent and fair subscription experience. Please review our cancellation and refund policy below.</p>

      <h2>Subscription Cancellation</h2>
      <ul>
        <li>You may cancel your Swalook subscription at any time through your account settings or by contacting our support team.</li>
        <li>Upon cancellation, your subscription will remain active until the end of your current billing period.</li>
        <li>No further charges will be applied after cancellation is processed.</li>
        <li>Your salon data will be retained for 30 days after cancellation, after which it will be permanently deleted in accordance with our data retention policy.</li>
      </ul>

      <h2>Free Trial Cancellation</h2>
      <ul>
        <li>If you are on a free trial, you may cancel at any time before the trial period ends without any charges.</li>
        <li>Once the trial period ends, your account will automatically convert to a paid subscription unless cancelled beforehand.</li>
      </ul>

      <h2>Refund Policy</h2>
      <ul>
        <li>Refund requests are evaluated on a case-by-case basis.</li>
        <li>If you experience a technical issue that prevents you from using Swalook as intended, please contact our support team within 7 days of the charge.</li>
        <li>Refunds, if approved, will be processed to your original method of payment within 7-10 business days.</li>
        <li>Partial-month refunds are not provided for mid-cycle cancellations.</li>
      </ul>

      <h2>Service Availability</h2>
      <p>In the unlikely event of extended service downtime (exceeding 24 consecutive hours), you may be eligible for a service credit or extension. Please contact our support team for such cases.</p>

      <h2>Contact Us</h2>
      <p>For cancellation or refund inquiries, contact us at:</p>
      <ul>
        <li>Email: <a href="mailto:info@swalook.in">info@swalook.in</a></li>
        <li>Website: <a href="https://swalook.in/">https://swalook.in/</a></li>
      </ul>
    </PolicyPageLayout>
  );
}
