'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './BlogPagination.module.css';

const VISIBLE_PAGES = 5;

export default function BlogPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  let start = Math.max(1, currentPage - Math.floor(VISIBLE_PAGES / 2));
  let end = Math.min(totalPages, start + VISIBLE_PAGES - 1);

  if (end - start + 1 < VISIBLE_PAGES) {
    start = Math.max(1, end - VISIBLE_PAGES + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className={styles.wrapper} aria-label="Blog pagination">
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FiChevronLeft aria-hidden="true" />
      </button>

      {start > 1 && (
        <>
          <button
            className={styles.page}
            onClick={() => onPageChange(1)}
            aria-label="Page 1"
          >
            1
          </button>
          {start > 2 && <span className={styles.ellipsis}>...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.page} ${page === currentPage ? styles.active : ''}`}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className={styles.ellipsis}>...</span>}
          <button
            className={styles.page}
            onClick={() => onPageChange(totalPages)}
            aria-label={`Page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FiChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
}
