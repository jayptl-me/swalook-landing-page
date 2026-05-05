'use client';
import { FiDollarSign } from 'react-icons/fi';
import FeaturePage from '@/components/FeaturePage';

export default function ExpensePage() {
  return (
    <FeaturePage
      currentSlug="salon-expense-management-software"
      icon={<FiDollarSign />}
      title="Salon Expense & Purchasing Management Software"
      heroDesc="Track expenses, manage purchases, and control budgets with Swalook's salon expense management software. Transparent and efficient."
      whyTitle="Why Expense Management Matters"
      whyDesc="Without proper expense tracking, salons bleed money on unnecessary purchases and missed deductions. Swalook gives you full financial visibility to maximize profitability."
      keyFeatures={[
        { title: 'Expense Tracking', desc: 'Log and categorize every business expense for complete transparency.' },
        { title: 'Purchase Management', desc: 'Create, track, and manage purchase orders from vendors.' },
        { title: 'Payment History', desc: 'Maintain a complete record of all payments and transactions.' },
        { title: 'Budget Planning', desc: 'Set budgets and track spending against targets.' },
        { title: 'Financial Reports', desc: 'Generate profit/loss reports and expense summaries.' },
      ]}
      compareTitle="Why Choose Swalook Over Spreadsheets?"
      compareDesc="Spreadsheets can't connect expenses to inventory, services, and revenue data. Swalook gives you a unified financial picture tied to your actual operations."
      withPoints={[
        'Track every expense with full transparency.',
        'Manage vendor purchases efficiently.',
        'Make informed financial decisions.',
      ]}
      withCta="Ready to take control of your salon's finances? Start your journey with Swalook."
    />
  );
}
