/* eslint-disable react/jsx-props-no-spreading */

import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import CustomHead from '@src/components/dom/CustomHead';
import Link from 'next/link';
import clsx from 'clsx';
import blogs from '@src/constants/blogs';
import styles from '@src/pages/blogs/blogs.module.scss';

const seo = {
  title: 'Priyam - Blogs',
  description:
    'Read articles and insights on web development, React, Next.js, performance optimization, and modern frontend techniques by Gyanranjan Priyam.',
  keywords: [
    'Priyam Blog',
    'Web Development Blog',
    'React Articles',
    'Next.js Tutorials',
    'Frontend Development',
    'JavaScript Tips',
    'Gyanranjan Priyam Blog',
  ],
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <section className={clsx(styles.titleContainer, 'layout-block-inner')}>
        <h1 className={clsx(styles.title, 'h1', 'pricedown-text')}>
          <AppearByWords>Blogs</AppearByWords>
        </h1>
      </section>
      <section className={clsx(styles.root, 'layout-block-inner')}>
        <div className={clsx(styles.blogList, 'layout-grid-inner')}>
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              scroll={false}
              className={styles.blogItem}
              aria-label={`Read ${blog.title}`}
            >
              <div className={styles.blogLeft}>
                <AppearTitle>
                  <div className={styles.authorRow}>
                    <span className={clsx(styles.authorName, 'p-xs')}>
                      Gyanranjan Priyam
                    </span>
                    <span className={clsx(styles.blogDate, 'p-xs')}>
                      {formatDate(blog.date)}
                    </span>
                  </div>
                </AppearTitle>
              </div>
              <div className={styles.blogCenter}>
                <AppearTitle>
                  <h4 className={clsx(styles.blogTitle, 'h5')}>{blog.title}</h4>
                </AppearTitle>
                <AppearTitle>
                  <p className={clsx(styles.blogExcerpt, 'p')}>
                    {blog.excerpt}
                  </p>
                </AppearTitle>
                <AppearTitle>
                  <div className={styles.blogBottomRow}>
                    <div className={styles.blogTags}>
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className={clsx(styles.blogTag, 'p-xs')}
                        >
                          {tag.toUpperCase().replace(/[\s.]/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>
                </AppearTitle>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Page;
