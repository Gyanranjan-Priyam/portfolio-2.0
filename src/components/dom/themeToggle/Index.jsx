import { useCallback, useEffect, useRef } from 'react';

import clsx from 'clsx';
import styles from '@src/components/dom/themeToggle/themeToggle.module.scss';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

function ThemeToggle() {
  const [theme, toggleTheme, setTheme] = useStore(
    useShallow((state) => [state.theme, state.toggleTheme, state.setTheme]),
  );
  const btnRef = useRef(null);
  const animatingRef = useRef(false);

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
    if (animatingRef.current) return;
    animatingRef.current = true;

    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate the maximum radius needed to cover the entire viewport
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // Determine the new theme colors
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const newBg = newTheme === 'dark' ? '#1a1a1d' : '#f0f4f1';

    // Create the overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99999;
      pointer-events: none;
      background-color: ${newBg};
      clip-path: circle(0px at ${x}px ${y}px);
      transition: clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(overlay);

    // Trigger the expand animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;
      });
    });

    // After the circle covers everything, swap the actual theme and remove overlay
    setTimeout(() => {
      toggleTheme();

      // Small delay to let the theme variables update, then remove overlay
      requestAnimationFrame(() => {
        overlay.style.transition = 'none';
        overlay.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;

        setTimeout(() => {
          overlay.remove();
          animatingRef.current = false;
        }, 50);
      });
    }, 700);
  }, [toggleTheme, theme]);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      ref={btnRef}
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
