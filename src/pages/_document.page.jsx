import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="/fonts/NeueHaasDisplayBold.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            href="/fonts/NeueHaasDisplayLight.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            href="/fonts/NeueHaasDisplayLightItalic.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            href="/fonts/NeueHaasDisplayMedium.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            href="/fonts/NeueHaasDisplayRoman.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            href="/fonts/NeueHaasDisplayRomanItalic.woff2"
            as="font"
            type="font/woff2"
          />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme');
                    if (!theme) {
                      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    document.documentElement.setAttribute('data-theme', theme);
                  } catch(e) {}
                })();
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
