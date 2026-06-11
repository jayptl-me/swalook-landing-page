'use client';
import { FiPackage } from 'react-icons/fi';
import FeaturePage from '@/components/product/FeaturePage';

export default function InventoryPage() {
  return (
    <FeaturePage
      currentSlug="salon-inventory-management-software"
      icon={<FiPackage />}
      title="Smart Salon Inventory Management Software"
      heroDesc="Reduce wastage, prevent stockouts, and manage expenses with Swalook's smart salon inventory management software. Multi-location, global-ready."
      whyTitle="Why Inventory Management Matters"
      whyDesc="Running out of products mid-service or over-ordering are common salon headaches. Swalook's inventory system gives you real-time visibility and control over every product in your salon."
      keyFeatures={[
        { title: 'Real-Time Stock Tracking', desc: 'Monitor product levels across all locations in real-time.' },
        { title: 'Low-Stock Alerts', desc: 'Get notified automatically when products run low.' },
        { title: 'Purchase Orders', desc: 'Create and manage purchase orders directly from the platform.' },
        { title: 'Product Usage Reports', desc: 'Track how much product is used per service for accurate costing.' },
        { title: 'Supplier Management', desc: 'Manage vendor details, pricing, and order history.' },
        { title: 'Multi-Location Sync', desc: 'Sync inventory across multiple salon branches.' },
      ]}
      compareTitle="Why Choose Swalook Over Manual Tracking?"
      compareDesc="Manual inventory tracking is error-prone and time-consuming. Swalook automates the entire process, connecting inventory directly to services and billing."
      withPoints={[
        'Prevent stockouts with automated alerts.',
        'Reduce product wastage significantly.',
        'Track inventory across multiple locations.',
      ]}
      withCta="Ready to take control of your salon inventory? Start your journey with Swalook."
    />
  );
}
