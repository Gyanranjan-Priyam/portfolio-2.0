import SplitType from 'split-type';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '@src/components/animationComponents/scatterReveal/scatterReveal.module.scss';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScatterReveal
 *
 * Wraps a full-screen sticky quote that scatters on scroll (assembled → scattered),
 * then reveals the children section from behind once the scatter reaches 75% progress.
 *
 * Props:
 *  - quote        {ReactNode}  The quote text / JSX rendered inside the sticky heading
 *  - quoteClass   {string}     Extra className(s) for the sticky <h3> (e.g. 'pricedown-text')
 *  - children     {ReactNode}  Content that appears from behind when scatter completes
 *  - contentClass {string}     Extra className(s) for the content wrapper section
 */
function ScatterReveal({ quote, quoteClass, children, contentClass }) {
  const quoteWrapperRef = useRef(null);
  const quoteTextRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));

  useIsomorphicLayoutEffect(() => {
    if (isLoading || !quoteTextRef.current || !quoteWrapperRef.current) return;

    const el = quoteTextRef.current;
    const splitted = new SplitType(el, { types: 'words' });

    // Start content hidden (only when children exist)
    if (contentRef.current && children) {
      gsap.set(contentRef.current, { opacity: 0 });
    }

    const ctx = gsap.context(() => {
      // Words scatter on scroll (assembled → scattered)
      gsap.fromTo(
        splitted.words,
        {
          'will-change': 'opacity, transform',
          opacity: 1,
          z: 0,
          xPercent: 0,
          yPercent: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
        },
        {
          opacity: 0,
          z: () => gsap.utils.random(500, 950),
          xPercent: () => gsap.utils.random(-100, 100),
          yPercent: () => gsap.utils.random(-10, 10),
          rotationX: () => gsap.utils.random(-90, 90),
          scale: () => gsap.utils.random(0.4, 0.8),
          ease: 'expo',
          scrollTrigger: {
            trigger: quoteWrapperRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            scroller: document?.querySelector('main'),
            invalidateOnRefresh: true,
          },
          stagger: {
            each: 0.006,
            from: 'random',
          },
        },
      );

      // Fade in children from 75% scatter progress (only when children exist)
      if (children) {
        ScrollTrigger.create({
          trigger: quoteWrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          scroller: document?.querySelector('main'),
          onUpdate: (self) => {
            if (contentRef.current) {
              const p = self.progress;
              const opacity = p >= 0.75 ? (p - 0.75) / 0.25 : 0;
              gsap.set(contentRef.current, { opacity });
            }
          },
        });
      }
    }, el);

    return () => {
      ctx.revert();
      splitted.revert();
    };
  }, [isLoading]);

  return (
    <>
      {/* Scatter hero — sits on top (z-index 2) */}
      <section ref={quoteWrapperRef} className={styles.scatterHero}>
        <h3 className={clsx(styles.scatterText, 'h3', quoteClass)}>
          <div ref={quoteTextRef} className={styles.scatterTextInner}>
            {quote}
          </div>
        </h3>
      </section>

      {/* Content — sits behind hero (z-index 1, margin-top: -100svh) */}
      {children && (
        <div
          ref={contentRef}
          className={clsx(styles.scatterContent, contentClass)}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default ScatterReveal;
