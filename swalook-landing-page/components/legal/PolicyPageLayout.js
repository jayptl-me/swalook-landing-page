'use client';
import Link from 'next/link';
import styles from './PolicyPage.module.css';

export default function PolicyPageLayout({ title, lastUpdated, children }) {
  return (
    <div className={styles.policyPage}>
      <div className={styles.policyContainer}>
        <div className={styles.policyBreadcrumb}>
          <Link href="/">Home</Link><span>/</span><span>{title}</span>
        </div>
        <h1 className={styles.policyTitle}>{title}</h1>
        <p className={styles.policyDate}>Last updated: {lastUpdated}</p>
        <div className={styles.policyContent}>{children}</div>
      </div>
    </div>
  );
}
