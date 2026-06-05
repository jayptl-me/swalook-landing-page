'use client';
import { FiUsers } from 'react-icons/fi';
import FeaturePage from '@/components/product/FeaturePage';

export default function StaffPage() {
  return (
    <FeaturePage
      currentSlug="salon-staff-attendance-software"
      icon={<FiUsers />}
      title="Smart Salon Staff & Attendance Management"
      heroDesc="Manage roles, shifts, and staff performance with Swalook's salon staff & attendance software. Ensure accurate payroll and smooth operations."
      whyTitle="Why Staff Management Matters"
      whyDesc="Your team is your greatest asset. Swalook helps you manage schedules, track attendance, measure performance, and ensure everyone is aligned with your salon's goals."
      keyFeatures={[
        { title: 'Role Management', desc: 'Define roles, permissions, and responsibilities for each team member.' },
        { title: 'Shift Scheduling', desc: 'Create and manage staff shifts with an intuitive calendar view.' },
        { title: 'Attendance Tracking', desc: 'Digital check-in/check-out for accurate attendance records.' },
        { title: 'Performance Metrics', desc: 'Track revenue, bookings, and ratings per stylist.' },
        { title: 'Payroll Integration', desc: 'Connect attendance data to payroll for accurate compensation.' },
      ]}
      compareTitle="Why Choose Swalook for Staff Management?"
      compareDesc="Generic HR tools don't understand salon workflows. Swalook connects staff management directly to appointments, services, and client feedback."
      withPoints={[
        'Organize your team with clear roles and shifts.',
        'Track attendance digitally for accurate payroll.',
        'Measure and improve staff performance.',
      ]}
      withCta="Ready to manage your salon team more effectively? Start your journey with Swalook."
    />
  );
}
