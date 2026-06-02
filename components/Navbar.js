'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronDown } from 'react-icons/fi';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    {
      label: 'Products',
      href: '/salon-crm-features',
      dropdown: [
        { label: 'CRM', href: '/salon-crm-features' },
        { label: 'Mobile App', href: '/mobile-app' },
      ],
    },
    {
      label: 'Resources',
      href: '/blogs',
      dropdown: [
        { label: 'Blogs', href: '/blogs' },
      ],
    },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Careers', href: '/careers' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            Swalook
            <span className={styles.logoSub}>Salon CRM Software</span>
          </Link>

          {/* Desktop Nav */}
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <div key={item.label} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${isActive(item.href) ? styles.activeLink : ''}`}
                >
                  {item.label}
                  {item.dropdown && <FiChevronDown className={styles.dropdownIcon} />}
                </Link>
                {item.dropdown && (
                  <div className={styles.dropdown}>
                    {item.dropdown.map((sub) => (
                      <Link key={sub.label} href={sub.href} className={styles.dropdownLink}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact" className={styles.ctaButton}>
              Request a Demo
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className={`${styles.menuToggle} ${mobileOpen ? styles.menuOpen : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-menu"
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayActive : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        id="mobile-navigation-menu"
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        {navItems.map((item) => (
          <div key={item.label}>
            <Link href={item.href} className={styles.mobileNavLink}>
              {item.label}
            </Link>
            {item.dropdown && (
              <div className={styles.mobileDropdown}>
                {item.dropdown.map((sub) => (
                  <Link key={sub.label} href={sub.href} className={styles.mobileDropdownLink}>
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link href="/contact" className={styles.mobileCta}>
          Request a Demo
        </Link>
      </div>
    </>
  );
}
