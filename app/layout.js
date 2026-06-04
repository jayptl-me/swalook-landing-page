import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Swalook - Revenue Generation Engine For The Beauty Industry',
  description: 'Swalook - Revenue Generation Engine For The Beauty Industry. Grow your salon business with better customer retention, smarter marketing, and fewer no-shows.',
  keywords: [
    'salon CRM',
    'salon management software',
    'beauty industry software',
    'salon retention software',
    'salon marketing automation',
    'salon no show reduction',
    'salon appointment management',
    'salon billing software',
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
    title: 'Swalook - Revenue Generation Engine For The Beauty Industry',
    description: 'Swalook - Revenue Generation Engine For The Beauty Industry. Grow your salon business with better customer retention, smarter marketing, and fewer no-shows.',
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
