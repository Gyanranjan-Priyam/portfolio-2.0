/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Quote from '@src/pages/components/quote/Index';
import Projects from '@src/pages/components/projects/Index';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Gyanranjan Priyam - Full Stack Developer Portfolio',
  description:
    'Full Stack Developer working at the intersection of web development, app development, and AI/ML to build scalable digital products people actually use.',
  keywords: [
    'Gyanranjan Priyam',
    'Full Stack Developer',
    'Web Developer',
    'Next.js Developer',
    'React Developer',
    'Frontend Developer',
    'Software Engineer',
    'Portfolio',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'GSAP Animation',
    'Web Applications',
    'Responsive Design',
    'AI/ML',
    'Next.js',
    'React',
    'Node.js',
    'HTML',
    'CSS',
  ],
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <Home />
      <About />
      <Quote />
      <Projects />
    </>
  );
}

export default Page;
