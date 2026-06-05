'use client';
import PolicyPageLayout from '@/components/legal/PolicyPageLayout';

export default function ShippingPolicy() {
  return (
    <PolicyPageLayout title="Service Delivery Policy" lastUpdated="April 12, 2025">
      <p>At SWALOOK GLOBAL PRIVATE LIMITED, we deliver our salon management platform as a cloud-based software service (SaaS). This policy outlines how our services are provisioned and delivered.</p>

      <h2>Service Activation</h2>
      <ul>
        <li>Upon successful subscription or free trial registration, your Swalook account is activated immediately.</li>
        <li>You will receive an account activation confirmation via email at your registered email address.</li>
        <li>Access credentials and onboarding instructions are delivered electronically at the time of activation.</li>
      </ul>

      <h2>Onboarding & Setup</h2>
      <ul>
        <li>New accounts include guided onboarding to help you configure your salon profile, services, staff, and preferences.</li>
        <li>Our support team is available to assist with setup questions and best practices.</li>
        <li>For enterprise or multi-branch accounts, dedicated onboarding support may be provided based on your subscription plan.</li>
      </ul>

      <h2>Service Availability</h2>
      <ul>
        <li>Swalook is a cloud-based platform accessible via web browser and mobile app.</li>
        <li>We target 99.9% uptime and perform scheduled maintenance during off-peak hours with advance notice.</li>
        <li>Service status updates are communicated via email and in-app notifications.</li>
      </ul>

      <h2>Updates & Feature Releases</h2>
      <ul>
        <li>Platform updates, new features, and improvements are deployed continuously without requiring any action on your part.</li>
        <li>Major feature releases are communicated via email and in-app announcements.</li>
      </ul>

      <h2>Data Portability</h2>
      <ul>
        <li>You may request an export of your salon data at any time during your active subscription.</li>
        <li>Data exports are provided in standard formats (CSV, PDF) within 5 business days of request.</li>
      </ul>

      <h2>Contact Us</h2>
      <p>For questions about service delivery or onboarding, contact us at:</p>
      <ul>
        <li>Email: <a href="mailto:info@swalook.in">info@swalook.in</a></li>
        <li>Website: <a href="https://swalook.in/">https://swalook.in/</a></li>
      </ul>
    </PolicyPageLayout>
  );
}
