import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Transition as ReactTransition,
  SwitchTransition,
} from 'react-transition-group';

import Footer from '@src/components/dom/Footer';
import ContactSection from '@src/components/dom/contact/ContactSection';
import PreFooter from '@src/components/dom/PreFooter';
import gsap from 'gsap';
import styles from '@src/components/dom/styles/layout.module.scss';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

function isBlogRoute(path) {
  return path === '/blogs' || path.startsWith('/blogs/');
}

function Layout({ children, layoutRef, mainRef, router }) {
  const [lenis, introOut, setIsLoading, isMenuOpen, setIsMenuOpen, setIsAbout] =
    useStore(
      useShallow((state) => [
        state.lenis,
        state.introOut,
        state.setIsLoading,
        state.isMenuOpen,
        state.setIsMenuOpen,
        state.setIsAbout,
      ]),
    );

  const enterTimelineRef = useRef();
  const exitTimelineRef = useRef();
  const prevPathRef = useRef(router.asPath);
  const nextPathRef = useRef(null);

  const [isEntering, setIsEntering] = useState(false);

  // Track navigation target so we know where we're heading during exit
  const [isBlogNav, setIsBlogNav] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url) => {
      nextPathRef.current = url;
      const from = isBlogRoute(prevPathRef.current);
      const to = isBlogRoute(url);
      setIsBlogNav(from && to);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events]);

  const menuTime = useMemo(() => (isMenuOpen ? 0.8 : 0), [isMenuOpen]);

  const handleEnter = useCallback(
    () => {
      if (introOut) {
        const fromBlog = isBlogRoute(prevPathRef.current);
        const toBlog = isBlogRoute(router.asPath);
        const skipTransition = fromBlog && toBlog;
        prevPathRef.current = router.asPath;

        if (skipTransition) {
          // Instant transition for blog-to-blog navigation
          gsap.set(layoutRef.current, { height: '100%', opacity: 1 });
          gsap.set(mainRef.current, {
            x: '0px',
            scale: 1,
            borderRadius: 0,
            height: 'auto',
            border: 'none',
            pointerEvents: 'auto',
          });
          gsap.set('#loader', { x: '-100%' });
          gsap.set('header', { autoAlpha: 1 });
          setIsAbout(false);
          setIsLoading(false);
          setIsBlogNav(false);
          lenis.start();
          lenis.scrollTo(0, { force: true, immediate: true });
          return;
        }

        if (exitTimelineRef.current) exitTimelineRef.current.pause();

        const tl = gsap.timeline({
          onComplete: () => {
            setIsAbout(router.asPath === '/about');
            setIsLoading(false);
            lenis.start();
          },
        });

        enterTimelineRef.current = tl;
        setIsEntering(true);

        tl.set(
          layoutRef.current,
          {
            ease: 'power2.inOut',
            height: '90%',
            opacity: 1,
            onComplete: () => {
              setIsAbout(router.asPath === '/about');
              setIsEntering(false);
            },
          },
          1.5,
        )
          .to(
            '#loader',
            {
              x: '-100%',
              ease: 'power2.inOut',
            },
            1.5,
          )
          .to(
            mainRef.current,
            {
              ease: 'power2.inOut',
              x: '0px',
            },
            1.5,
          )
          .to(
            mainRef.current,
            {
              ease: 'power2.inOut',
              borderRadius: 0,
              scale: 1,
            },
            2,
          )
          .to(
            layoutRef.current,
            {
              ease: 'power2.inOut',
              height: '100%',
              opacity: 1,
            },
            2,
          )
          .to(
            'header',
            {
              ease: 'power2.inOut',
              autoAlpha: 1,
            },
            2.2,
          )
          .to(
            mainRef.current,
            {
              ease: 'power2.inOut',
              height: 'auto',
              border: 'none',
              pointerEvents: 'auto',
            },
            2.2,
          );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [introOut],
  );

  const handleExit = useCallback(
    () => {
      if (introOut) {
        const fromBlog = isBlogRoute(prevPathRef.current);
        const toBlog = nextPathRef.current
          ? isBlogRoute(nextPathRef.current)
          : false;

        if (fromBlog && toBlog) {
          // Skip exit animation for blog-to-blog navigation
          lenis.stop();
          if (isMenuOpen) setIsMenuOpen(false);
          lenis.scrollTo(0, { force: true });
          return;
        }

        if (enterTimelineRef.current) enterTimelineRef.current.pause();

        lenis.stop();
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
        if (isEntering === false) {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsLoading(true);
              lenis.scrollTo(0, { force: true });
            },
          });

          exitTimelineRef.current = tl;

          if (document?.getElementById('scrollbar')) {
            tl.to(
              document.getElementById('scrollbar'),
              {
                ease: 'power2.inOut',
                autoAlpha: 0,
                duration: 0.5,
              },
              menuTime,
            );
          }

          tl.to(
            'header',
            {
              ease: 'power2.inOut',
              autoAlpha: 0,
              duration: 0.5,
              onComplete: () => {
                gsap.set('#loader', {
                  scale: 0.9,
                  x: '100%',
                  borderRadius: '1.3888888889vw',
                });
                gsap.set('header', {
                  left: 0,
                  top: 0,
                  scale: 1,
                  duration: 0,
                });
              },
              overwrite: true,
            },
            menuTime,
          )
            .to(
              layoutRef.current,
              {
                ease: 'power2.inOut',
                height: '90svh',
                opacity: 1,
                duration: 0.5,
              },
              menuTime,
            )
            .to(
              mainRef.current,
              {
                ease: 'power2.inOut',
                scale: 0.9,
                opacity: 1,
                border: `2px solid ${getComputedStyle(document.documentElement).getPropertyValue('--white').trim()}`,
                borderRadius: '1.3888888889vw',
                duration: 0.5,
              },
              menuTime,
            )
            .to(
              mainRef.current,
              {
                ease: 'power2.inOut',
                x: '-100%',
                duration: 0.5,
              },
              0.5 + menuTime,
            )
            .to(
              '#loader',
              {
                ease: 'power2.inOut',
                x: '0px',
                duration: 0.5,
              },
              0.5 + menuTime,
            )
            .set(mainRef.current, {
              x: '100%',
            });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [introOut, menuTime, isEntering],
  );

  return (
    <>
      <SwitchTransition>
        <ReactTransition
          key={router.asPath}
          in={false}
          unmountOnExit
          timeout={{
            enter: introOut ? (isBlogNav ? 50 : 3000) : 0,
            exit: introOut ? (isBlogNav ? 50 : 1800) : 0,
          }}
          onEnter={handleEnter}
          onExit={handleExit}
        >
          {children}
        </ReactTransition>
      </SwitchTransition>

      <ContactSection />
      <PreFooter />
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
