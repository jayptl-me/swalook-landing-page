'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import styles from './BlogSearch.module.css';

export default function BlogSearch({ onSearch, placeholder = 'Search articles...' }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        onSearch(value.trim().toLowerCase());
      }, 250);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  }, [onSearch]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClear();
      inputRef.current?.blur();
    }
  }, [handleClear]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${isFocused ? styles.focused : ''}`}
      role="search"
    >
      <FiSearch className={styles.icon} aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.input}
        aria-label="Search blog articles"
        autoComplete="off"
      />
      {query && (
        <button
          onClick={handleClear}
          className={styles.clear}
          aria-label="Clear search"
          type="button"
        >
          <FiX aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
