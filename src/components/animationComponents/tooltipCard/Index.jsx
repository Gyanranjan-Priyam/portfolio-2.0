import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';
import gsap from 'gsap';
import styles from '@src/components/animationComponents/tooltipCard/tooltipCard.module.scss';

const TOOLTIP_MIN_WIDTH = 240;
const OFFSET = 12;
const TOUCH_HIDE_DELAY = 2000;

function TooltipCard({ content, children, containerClassName }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Ensure portal only renders client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const calculatePosition = useCallback((clientX, clientY) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = TOOLTIP_MIN_WIDTH;
    const tooltipHeight = contentRef.current
      ? contentRef.current.scrollHeight
      : 0;

    let finalX = clientX + OFFSET;
    let finalY = clientY + OFFSET;

    // Flip horizontally if overflowing right
    if (finalX + tooltipWidth > viewportWidth) {
      finalX = clientX - tooltipWidth - OFFSET;
    }

    // Clamp to left edge
    if (finalX < 0) {
      finalX = OFFSET;
    }

    // Flip vertically if overflowing bottom
    if (finalY + tooltipHeight > viewportHeight) {
      finalY = clientY - tooltipHeight - OFFSET;
    }

    // Clamp to top edge
    if (finalY < 0) {
      finalY = OFFSET;
    }

    return { x: finalX, y: finalY };
  }, []);

  const updateTooltipPosition = useCallback(
    (clientX, clientY) => {
      mouseRef.current = { x: clientX, y: clientY };
      const pos = calculatePosition(clientX, clientY);

      if (tooltipRef.current) {
        gsap.set(tooltipRef.current, { left: pos.x, top: pos.y });
      }
    },
    [calculatePosition],
  );

  // Measure the natural height of the content
  const measureHeight = useCallback(() => {
    if (!tooltipRef.current || !contentRef.current) return 0;

    // Temporarily expand offscreen to measure true content height
    gsap.set(tooltipRef.current, {
      height: 'auto',
      visibility: 'hidden',
      opacity: 0,
    });
    const h = contentRef.current.offsetHeight;
    gsap.set(tooltipRef.current, { height: 0 });
    return h;
  }, []);

  // Animate in / out
  useEffect(() => {
    if (!tooltipRef.current || !contentRef.current) return;

    if (isVisible) {
      const targetHeight = measureHeight();
      if (targetHeight <= 0) return;

      const pos = calculatePosition(mouseRef.current.x, mouseRef.current.y);

      gsap.set(tooltipRef.current, {
        left: pos.x,
        top: pos.y,
        visibility: 'visible',
      });
      gsap.to(tooltipRef.current, {
        height: targetHeight,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
      });
    } else {
      gsap.to(tooltipRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.inOut',
        onComplete: () => {
          if (tooltipRef.current) {
            gsap.set(tooltipRef.current, { visibility: 'hidden' });
          }
        },
      });
    }
  }, [isVisible, calculatePosition, measureHeight]);

  const handleMouseEnter = useCallback(
    (e) => {
      setIsVisible(true);
      updateTooltipPosition(e.clientX, e.clientY);
    },
    [updateTooltipPosition],
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isVisible) return;
      updateTooltipPosition(e.clientX, e.clientY);
    },
    [isVisible, updateTooltipPosition],
  );

  const handleTouchStart = useCallback(
    (e) => {
      const touch = e.touches[0];
      updateTooltipPosition(touch.clientX, touch.clientY);
      setIsVisible(true);
    },
    [updateTooltipPosition],
  );

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, TOUCH_HIDE_DELAY);
  }, []);

  const handleClick = useCallback(
    (e) => {
      // Toggle on tap for touch-only devices
      if (window.matchMedia('(hover: none)').matches) {
        e.preventDefault();
        if (isVisible) {
          setIsVisible(false);
        } else {
          updateTooltipPosition(e.clientX, e.clientY);
          setIsVisible(true);
        }
      }
    },
    [isVisible, updateTooltipPosition],
  );

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {children}
      {mounted &&
        createPortal(
          <div ref={tooltipRef} className={styles.tooltip}>
            <div ref={contentRef} className={styles.content}>
              {content}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

export default TooltipCard;
