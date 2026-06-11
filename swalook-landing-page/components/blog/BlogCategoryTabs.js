'use client';

import styles from './BlogCategoryTabs.module.css';

export default function BlogCategoryTabs({ categories, activeCategory, onChange }) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Blog categories">
      {categories.map((category) => {
        const isActive = activeCategory === category.label;

        return (
          <button
            key={category.slug}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onChange(category.label)}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
