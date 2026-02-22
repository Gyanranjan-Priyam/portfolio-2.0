import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/pages/components/about/styles/about.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

function About() {
  const isMobile = useIsMobile();
  const rootRef = useRef();
  const animatedImageRef = useRef();

  const setupScrollAnimation = () => {
    const ctx = gsap.context(() => {
      gsap.set(animatedImageRef.current, { top: !isMobile ? '-20vw' : '0' });
      if (!isMobile) {
        gsap.to(animatedImageRef.current, {
          top: '20vw',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            scroller: document?.querySelector('main'),
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupScrollAnimation();
    return () => ctx.kill();
  }, [isMobile]);

  const renderImageContainer = () => (
    <div className={styles.imageContainer}>
      <Image
        priority
        src="/priyams/front.webp"
        sizes="100%"
        fill
        alt="Gyanranjan Priyam"
      />
    </div>
  );

  return (
    <section ref={rootRef} className={styles.root}>
      <div className={clsx(styles.nameContainer, 'layout-block-inner')}>
        <AppearTitle>
          <h1 className={clsx('h1', 'medium')}>Hey, My name&apos;s</h1>
          <h1 className={clsx('h1', 'medium', 'name-text')}>
            Gyanranjan Priyam!
          </h1>
        </AppearTitle>
      </div>

      <div className={clsx(styles.container, 'layout-grid-inner')}>
        {isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapper)} ref={animatedImageRef}>
          <AppearTitle>
            <div className="p-l">
              “Driven by curiosity and hands-on learning, I approach
            </div>
            <div className="p-l">
              every project with a problem-solving mindset and a focus
            </div>
            <div className="p-l">
              on clarity, performance, and thoughtful execution
            </div>
            <div className="p-l">to bring your ideas to life.”</div>
          </AppearTitle>
        </div>
        {!isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapperBottom)}>
          {!isMobile ? (
            <AppearTitle key="desktop-descWrapperBottom">
              <h6 className="h6">
                A full-stack engineer focused on building thoughtful
              </h6>
              <h6 className="h6">
                digital products with attention to detail and usability.
              </h6>
              <h6 className="h6">
                I enjoy turning ideas into smooth, reliable experiences
              </h6>
              <h6 className="h6">through clean and maintainable</h6>
              <h6 className="h6">code.</h6>
            </AppearTitle>
          ) : (
            <AppearTitle key="mobile-descWrapperBottom">
              <h6 className="h6">
                {' '}
                A full-stack engineer focused on building thoughtful
              </h6>
              <h6 className="h6">
                digital products with attention to detail and usability.
              </h6>
              <h6 className="h6">
                I enjoy turning ideas into smooth, reliable experiences
              </h6>
              <h6 className="h6">through clean and maintainable code.</h6>
            </AppearTitle>
          )}
          <div className={clsx(styles.buttonContainer)}>
            <ButtonLink href="/about" label="ABOUT ME" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
