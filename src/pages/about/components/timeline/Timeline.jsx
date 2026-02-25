import { useCallback, useEffect, useRef } from 'react';

import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import experiences from '@src/pages/about/components/timeline/constants/experiences';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '@src/pages/about/components/timeline/styles/timeline.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function Timeline() {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));

  // Build a snake SVG path based on card positions
  const buildSnakePath = useCallback(() => {
    if (!sectionRef.current || !cardsRef.current.length) return '';

    const section = sectionRef.current;
    const sectionRect = section.getBoundingClientRect();
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return '';

    const points = cards.map((card, i) => {
      const rect = card.getBoundingClientRect();
      const isLeft = i % 2 === 0;

      // Center point of the dot on the card's side
      const x = isLeft
        ? rect.left - sectionRect.left + rect.width * 0.5
        : rect.right - sectionRect.left - rect.width * 0.5;
      const y = rect.top - sectionRect.top + 28;

      return { x, y, isLeft };
    });

    if (points.length < 2) return '';

    // Build smooth cubic bezier path snaking between left and right cards
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midY = (prev.y + curr.y) / 2;

      // Control points create the S-curve
      const cp1x = prev.x;
      const cp1y = midY;
      const cp2x = curr.x;
      const cp2y = midY;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }

    return d;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (isLoading || !sectionRef.current) return;

    // Small delay to ensure layout is settled
    const raf = requestAnimationFrame(() => {
      const path = pathRef.current;
      if (!path) return;

      const d = buildSnakePath();
      if (!d) return;
      path.setAttribute('d', d);

      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Animate path draw on scroll
      const pathScrollTrigger = {
        id: 'timeline-path',
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 0.8,
        scroller: document?.querySelector('main'),
      };

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: pathScrollTrigger,
      });

      // Animate paper plane along the path
      if (planeRef.current) {
        gsap.set(planeRef.current, { opacity: 1, scale: 1 });
        gsap.to(planeRef.current, {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: 'none',
          scrollTrigger: {
            ...pathScrollTrigger,
            id: 'timeline-plane',
          },
        });
      }

      // Animate each card + dot staggered on scroll
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        const dot = dotsRef.current[i];
        const isLeft = i % 2 === 0;

        gsap.set(card, {
          opacity: 0,
          x: isLeft ? -60 : 60,
          scale: 0.92,
        });

        if (dot) {
          gsap.set(dot, { scale: 0, opacity: 0 });
        }

        ScrollTrigger.create({
          id: `timeline-card-${i}`,
          trigger: card,
          start: 'top 85%',
          end: 'top 55%',
          scroller: document?.querySelector('main'),
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
            });
            if (dot) {
              gsap.to(dot, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(2)',
                delay: 0.15,
              });
            }
          },
          once: true,
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getById('timeline-path')?.kill();
      ScrollTrigger.getById('timeline-plane')?.kill();
      cardsRef.current.forEach((_, i) => {
        ScrollTrigger.getById(`timeline-card-${i}`)?.kill();
      });
    };
  }, [isLoading, isMobile, buildSnakePath]);

  // Rebuild path on resize
  useEffect(() => {
    const handleResize = () => {
      const path = pathRef.current;
      if (!path) return;
      const d = buildSnakePath();
      if (d) path.setAttribute('d', d);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [buildSnakePath]);

  return (
    <section
      ref={sectionRef}
      className={clsx(styles.root, 'layout-grid-inner')}
    >
      <div className={styles.header}>
        <AppearTitle>
          <p className={clsx(styles.sectionLabel, 'p-x')}>Experience</p>
          <h3 className="h3">Journey So Far</h3>
        </AppearTitle>
      </div>

      <div className={styles.timeline}>
        {/* SVG snake path + paper plane */}
        <svg className={styles.snakeSvg} aria-hidden="true">
          <path
            ref={pathRef}
            className={styles.snakePath}
            fill="none"
            strokeLinecap="round"
          />
          {/* Paper plane that follows the path */}
          <g ref={planeRef} className={styles.paperPlane} opacity="0">
            <path
              d="M0,-8 L16,0 L0,8 L4,0 Z"
              fill="var(--black)"
              opacity="0.55"
            />
            {/* Dashed trail behind the plane */}
            <line
              x1="-12"
              y1="0"
              x2="-2"
              y2="0"
              stroke="var(--black)"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.3"
            />
          </g>
        </svg>

        {/* Experience cards in snake layout */}
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={`${exp.company}-${index}`}
              className={clsx(
                styles.snakeRow,
                isLeft ? styles.snakeLeft : styles.snakeRight,
              )}
            >
              {/* Dot marker */}
              <div
                ref={(el) => {
                  dotsRef.current[index] = el;
                }}
                className={styles.dot}
              >
                <span className={styles.dotIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Card */}
              <div
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={styles.card}
              >
                {/* Decorative clip shape */}
                <svg
                  className={styles.cardClip}
                  viewBox="0 0 400 6"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0,3 Q50,0 100,3 T200,3 T300,3 T400,3"
                    fill="none"
                    stroke="var(--black)"
                    strokeWidth="1"
                    opacity="0.12"
                  />
                </svg>

                <div className={styles.cardInner}>
                  <div className={styles.cardHeader}>
                    <h5 className={clsx(styles.role, 'h5')}>{exp.role}</h5>
                    <span className={clsx(styles.date, 'p-xs')}>
                      {exp.date}
                    </span>
                  </div>
                  <p className={clsx(styles.company, 'p-l')}>{exp.company}</p>
                  <p className={clsx(styles.description, 'p')}>
                    {exp.description}
                  </p>
                  {exp.tags && (
                    <div className={styles.tags}>
                      {exp.tags.map((tag) => (
                        <span key={tag} className={clsx(styles.tag, 'p-xs')}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Timeline;
