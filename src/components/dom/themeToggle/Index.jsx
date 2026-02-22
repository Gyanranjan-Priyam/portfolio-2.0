import { useCallback, useEffect } from 'react';

import clsx from 'clsx';
import styles from '@src/components/dom/themeToggle/themeToggle.module.scss';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

function ThemeToggle() {
  const [theme, toggleTheme, setTheme] = useStore(
    useShallow((state) => [state.theme, state.toggleTheme, state.setTheme]),
  );

  // Initialize theme from localStorage or system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, [setTheme]);

  const handleToggle = useCallback(() => {
    // Add transition class for smooth color change
    document.documentElement.classList.add('theme-transition');
    toggleTheme();
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 600);
  }, [toggleTheme]);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={clsx(styles.toggle, isDark && styles.dark)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={isDark}
    >
      {/* Track background */}
      <span className={styles.track}>
        {/* Sun icon (left side) */}
        <span className={clsx(styles.icon, styles.sunIcon)}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </span>

        {/* Moon icon (right side) */}
        <span className={clsx(styles.icon, styles.moonIcon)}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>

        {/* Sliding knob */}
        <span className={styles.knob} />
      </span>
    </button>
  );
}

export default ThemeToggle;
