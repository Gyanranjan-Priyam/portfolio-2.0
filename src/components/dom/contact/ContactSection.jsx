import { useCallback, useRef, useState } from 'react';

import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import AppearBlock from '@src/components/animationComponents/appearBlock/Index';
import clsx from 'clsx';
import styles from '@src/components/dom/contact/contact.module.scss';

function ContactSection() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      // Using Formspree — replace YOUR_FORM_ID with your actual Formspree endpoint
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }, []);

  return (
    <section id="contact" className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <AppearTitle>
            <p className={clsx(styles.sectionLabel, 'p-x')}>Get In Touch</p>
            <h3 className="h3">Let&apos;s Work</h3>
            <h3 className="h3">Together</h3>
          </AppearTitle>
          <AppearBlock>
            <p className={clsx(styles.headerDesc, 'p')}>
              Have a project in mind or just want to say hello? Fill out the
              form and I&apos;ll get back to you as soon as possible.
            </p>
          </AppearBlock>
        </div>

        <form
          ref={formRef}
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <AppearBlock>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label
                  htmlFor="contact-name"
                  className={clsx(styles.label, 'p-xs')}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className={clsx(styles.input, 'p-l')}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={styles.field}>
                <label
                  htmlFor="contact-email"
                  className={clsx(styles.label, 'p-xs')}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={clsx(styles.input, 'p-l')}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          </AppearBlock>

          <AppearBlock>
            <div className={styles.field}>
              <label
                htmlFor="contact-subject"
                className={clsx(styles.label, 'p-xs')}
              >
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className={clsx(styles.input, 'p-l')}
                placeholder="What's this about?"
              />
            </div>
          </AppearBlock>

          <AppearBlock>
            <div className={styles.field}>
              <label
                htmlFor="contact-message"
                className={clsx(styles.label, 'p-xs')}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                className={clsx(styles.textarea, 'p-l')}
                placeholder="Tell me about your project..."
                rows={4}
                required
              />
            </div>
          </AppearBlock>

          <AppearBlock>
            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>
              {status === 'success' && (
                <span className={clsx(styles.statusMsg, styles.success, 'p-x')}>
                  Message sent! I&apos;ll be in touch.
                </span>
              )}
              {status === 'error' && (
                <span className={clsx(styles.statusMsg, styles.error, 'p-x')}>
                  Something went wrong. Please try again.
                </span>
              )}
            </div>
          </AppearBlock>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
