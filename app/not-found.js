import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export const metadata = {
  title: '404 — Page Not Found | Swalook',
};

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <span className="section-label">404</span>

      <h1 className="section-title" style={{ marginBottom: 12 }}>
        Page Not Found
      </h1>

      <p className="section-subtitle" style={{ marginBottom: 32 }}>
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn btn-primary">
          <FiArrowLeft aria-hidden="true" style={{ marginRight: 8 }} />
          Back to Home
        </Link>
        <Link href="/salon-crm-features" className="btn btn-outline">
          Explore Features
        </Link>
      </div>
    </section>
  );
}
