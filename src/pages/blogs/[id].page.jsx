/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import AppearBlock from '@src/components/animationComponents/appearBlock/Index';
import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import CustomHead from '@src/components/dom/CustomHead';
import Link from 'next/link';
import clsx from 'clsx';
import blogs from '@src/constants/blogs';
import styles from '@src/pages/blogs/blog.module.scss';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ── Share helpers ── */
function getShareUrl(platform, url, title) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  switch (platform) {
    case 'whatsapp':
      return `https://wa.me/?text=${encodedTitle}%20${encoded}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`;
    case 'instagram':
      return null; // Instagram doesn't support direct URL sharing
    default:
      return '#';
  }
}

/* ── SVG Icons ── */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function ReadAloudIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
    >
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

function Page({ id }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const utteranceRef = useRef(null);

  const blogIndex = useMemo(() => blogs.findIndex((b) => b.id === id), [id]);
  const blog = useMemo(() => blogs[blogIndex], [blogIndex]);
  const nextBlog = useMemo(
    () => blogs[(blogIndex + 1) % blogs.length],
    [blogIndex],
  );

  const headings = useMemo(
    () => blog.content.filter((b) => b.type === 'heading').map((b) => b.text),
    [blog],
  );

  const blogUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://priyam.dev/blogs/${id}`;

  const handleShare = useCallback(
    (platform) => {
      const url = getShareUrl(platform, blogUrl, blog.title);
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
      setShareOpen(false);
    },
    [blogUrl, blog.title],
  );

  /* ── Read aloud helpers ── */
  const getArticleText = useCallback(() => {
    const parts = [blog.title, blog.excerpt];
    blog.content.forEach((block) => {
      if (block.type === 'heading' || block.type === 'paragraph') {
        parts.push(block.text);
      } else if (block.type === 'list') {
        block.items.forEach((item) => parts.push(item));
      }
    });
    return parts.join('. ');
  }, [blog]);

  const handleReadAloud = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const text = getArticleText();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  }, [isReading, getArticleText]);

  // Clean up speech on unmount
  useEffect(
    () => () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    },
    [],
  );

  const scrollToHeading = useCallback((headingText) => {
    const headingEls = document.querySelectorAll('[data-heading]');
    headingEls.forEach((el) => {
      if (el.getAttribute('data-heading') === headingText) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, []);

  const seo = useMemo(
    () => ({
      title: `Priyam - ${blog.title}`,
      description: blog.excerpt,
      keywords: blog.tags,
    }),
    [blog],
  );

  return (
    <>
      <CustomHead {...seo} />
      <div className={clsx(styles.wrapper, 'layout-block-inner')}>
        {/* ── Left sidebar: On This Page ── */}
        <aside className={styles.leftSidebar}>
          <div className={styles.tocContainer}>
            <h3 className={clsx(styles.tocTitle, 'p')}>On This Page</h3>
            <ul className={styles.tocList}>
              {headings.map((h) => (
                <li key={h} className={styles.tocItem}>
                  <button
                    type="button"
                    className={clsx(styles.tocLink, 'p-xs')}
                    onClick={() => scrollToHeading(h)}
                  >
                    {h}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── Main content ── */}
        <article className={styles.mainContent}>
          {/* Back link */}
          <div className={styles.backRow}>
            <Link
              href="/blogs"
              scroll={false}
              className={clsx(styles.backLink, 'p')}
            >
              <span className={styles.backArrow}>&larr;</span> All Blogs
            </Link>
          </div>

          {/* Title */}
          <div className={styles.titleBlock}>
            <AppearBlock>
              <h1 className={clsx(styles.blogTitle, 'h2')}>{blog.title}</h1>
            </AppearBlock>
          </div>

          {/* Intro excerpt */}
          <div className={styles.introBlock}>
            <AppearTitle>
              <p className={clsx(styles.introText, 'p-l')}>{blog.excerpt}</p>
            </AppearTitle>
          </div>

          {/* Meta row */}
          <div className={styles.metaBlock}>
            <AppearTitle>
              <div className={styles.metaRow}>
                <span className={clsx(styles.metaItem, 'p-x')}>
                  By Gyanranjan Priyam
                </span>
                <span className={styles.metaDot} />
                <span className={clsx(styles.metaItem, 'p-x')}>
                  {formatDate(blog.date)}
                </span>
                {blog.tags.map((tag) => (
                  <span key={tag} className={clsx(styles.metaTag, 'p-xs')}>
                    #{tag.toUpperCase().replace(/[\s.]/g, '')}
                  </span>
                ))}
              </div>
            </AppearTitle>
            {blog.updatedAt && (
              <AppearTitle>
                <span className={clsx(styles.updatedAt, 'p-xs')}>
                  Last updated: {formatDate(blog.updatedAt)}
                </span>
              </AppearTitle>
            )}

            {/* Mobile inline actions (read + share) */}
            <div className={styles.mobileInlineActions}>
              <button
                type="button"
                className={clsx(
                  styles.mobileInlineBtn,
                  isReading && styles.mobileInlineBtnActive,
                )}
                onClick={handleReadAloud}
                aria-label={isReading ? 'Stop reading' : 'Read article aloud'}
              >
                {isReading ? <StopIcon /> : <ReadAloudIcon />}
              </button>
              <button
                type="button"
                className={styles.mobileInlineBtn}
                onClick={() => handleShare('whatsapp')}
                aria-label="Share on WhatsApp"
              >
                <WhatsAppIcon />
              </button>
              <button
                type="button"
                className={styles.mobileInlineBtn}
                onClick={() => handleShare('linkedin')}
                aria-label="Share on LinkedIn"
              >
                <LinkedInIcon />
              </button>
              <button
                type="button"
                className={styles.mobileInlineBtn}
                onClick={() => handleShare('twitter')}
                aria-label="Share on Twitter / X"
              >
                <TwitterIcon />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Content */}
          <div className={styles.contentBlock}>
            {blog.content.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <AppearTitle key={`block-${index}`}>
                    <h2
                      className={clsx(styles.sectionHeading, 'h4')}
                      data-heading={block.text}
                    >
                      {block.text}
                    </h2>
                  </AppearTitle>
                );
              }
              if (block.type === 'list') {
                return (
                  <AppearTitle key={`block-${index}`}>
                    <ul className={styles.contentList}>
                      {block.items.map((item, i) => (
                        <li
                          key={`list-${index}-${i}`}
                          className={clsx(styles.contentListItem, 'p-l')}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AppearTitle>
                );
              }
              return (
                <AppearTitle key={`block-${index}`}>
                  <p className={clsx(styles.contentParagraph, 'p-l')}>
                    {block.text}
                  </p>
                </AppearTitle>
              );
            })}
          </div>
        </article>

        {/* ── Right sidebar: Next Blog + Share ── */}
        <aside className={styles.rightSidebar}>
          {/* Next blog card */}
          <div className={styles.nextBlogCard}>
            <span className={clsx(styles.nextLabel, 'p-xs')}>Next Blog</span>
            <Link
              href={`/blogs/${nextBlog.id}`}
              scroll={false}
              className={styles.nextBlogLink}
            >
              <h4 className={clsx(styles.nextBlogTitle, 'p')}>
                {nextBlog.title}
              </h4>
              <span className={clsx(styles.nextBlogDate, 'p-xs')}>
                {formatDate(nextBlog.date)}
              </span>
            </Link>
          </div>

          {/* Read aloud */}
          <div className={styles.readAloudSection}>
            <button
              type="button"
              className={clsx(
                styles.readAloudBtn,
                isReading && styles.readAloudBtnActive,
              )}
              onClick={handleReadAloud}
              aria-label={isReading ? 'Stop reading' : 'Read article aloud'}
            >
              {isReading ? <StopIcon /> : <ReadAloudIcon />}
              <span className={clsx(styles.readAloudLabel, 'p-xs')}>
                {isReading ? 'Stop' : 'Listen'}
              </span>
            </button>
          </div>

          {/* Share icons */}
          <div className={styles.shareSection}>
            <span className={clsx(styles.shareLabel, 'p-xs')}>Share</span>
            <div className={styles.shareIcons}>
              <button
                type="button"
                className={styles.shareBtn}
                onClick={() => handleShare('whatsapp')}
                aria-label="Share on WhatsApp"
              >
                <WhatsAppIcon />
              </button>
              <button
                type="button"
                className={styles.shareBtn}
                onClick={() => handleShare('linkedin')}
                aria-label="Share on LinkedIn"
              >
                <LinkedInIcon />
              </button>
              <button
                type="button"
                className={styles.shareBtn}
                onClick={() => handleShare('instagram')}
                aria-label="Share on Instagram"
              >
                <InstagramIcon />
              </button>
              <button
                type="button"
                className={styles.shareBtn}
                onClick={() => handleShare('twitter')}
                aria-label="Share on Twitter / X"
              >
                <TwitterIcon />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = blogs.map((blog) => ({ params: { id: blog.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;
  return { props: { id: params.id } };
}

export default Page;
