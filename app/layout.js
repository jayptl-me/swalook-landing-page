import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Salon CRM Software for Smart Salon Management | Swalook',
  description: 'Swalook is an all-in-one salon CRM software designed to streamline your entire salon operations effortlessly with insights and automation.',
  keywords: 'salon CRM, salon management software, salon appointments, salon billing, salon inventory, beauty salon software',
  openGraph: {
    title: 'Salon CRM Software for Smart Salon Management | Swalook',
    description: 'Swalook is an all-in-one salon CRM software designed to streamline your entire salon operations effortlessly with insights and automation.',
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
