/**
 * A tiny 1x1 pixel SVG blurred placeholder for use with Next.js Image component.
 * Use as: placeholder="blur" blurDataURL={shimmerBlurDataUrl}
 *
 * For external (Cloudinary) images, use the shimmer SVG.
 * For local images, use placeholder="blur" with this data URL.
 */

const shimmer = (w = 700, h = 400) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#33333308" offset="20%" />
      <stop stop-color="#33333318" offset="50%" />
      <stop stop-color="#33333308" offset="80%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#33333308" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.5s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const shimmerBlurDataUrl = (w, h) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

// Simple solid color blur placeholder
export const solidBlurDataUrl =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMzMzMzMzMwOCIvPjwvc3ZnPg==';
