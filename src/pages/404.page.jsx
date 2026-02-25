import Link from 'next/link';
import clsx from 'clsx';
import styles from '@src/pages/404.module.scss';
import CustomHead from '@src/components/dom/CustomHead';

export default function Custom404() {
  return (
    <>
      <CustomHead
        title="404 — Page Not Found | Gyanranjan Priyam"
        description="The page you're looking for doesn't exist. Let's get you back on track."
      />
      <section className={styles.root}>
        <div className={styles.noise} />
        <div className={styles.glitchWrapper}>
          <h1 className={styles.title}>404</h1>
        </div>
        <h4 className={clsx(styles.subtitle, 'h4')}>Lost in the codebase</h4>
        <p className={clsx(styles.description, 'p-l')}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          But don&apos;t worry — great things await elsewhere.
        </p>
        <div className={styles.buttonContainer}>
          <Link href="/" scroll={false} className={styles.homeLink}>
            ← Take me home
          </Link>
          <Link href="/projects" scroll={false} className={styles.backLink}>
            View projects →
          </Link>
        </div>
      </section>
    </>
  );
}
