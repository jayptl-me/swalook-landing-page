import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Swalook: All-in-One Salon Management Software and Marketing Platform',
  description: 'Swalook is an all-in-one salon management software and marketing platform for bookings, billing, retention, marketing automation, and staff management. Trusted by salons, spas, and multi-branch beauty brands across India.',
  keywords: [
    'salon management software',
    'salon CRM',
    'salon marketing platform',
    'beauty industry software',
    'salon booking software',
    'salon billing software',
    'salon retention software',
    'salon marketing automation',
    'salon no show reduction',
    'salon appointment management',
    'salon inventory management',
    'beauty salon CRM',
    'spa management software',
    'salon software India',
    'salon CRM India',
    'beauty business software India',
    'salon management India',
    'salon CRM Maharashtra',
    'salon CRM Mumbai',
    'salon CRM Delhi',
    'salon CRM Bangalore',
    'salon CRM Chennai',
    'salon CRM Hyderabad',
    'salon CRM Pune',
    'salon CRM Kolkata'
  ].join(', '),
  openGraph: {
    title: 'Swalook: All-in-One Salon Management Software and Marketing Platform',
    description: 'Swalook is an all-in-one salon management software and marketing platform for bookings, billing, retention, marketing automation, and staff management.',
    url: 'https://swalook.in',
    siteName: 'Swalook',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
