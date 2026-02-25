/* eslint-disable react/jsx-props-no-spreading */
import Overview from '@src/pages/about/components/overview/Overview';
import ScatterQuote from '@src/pages/about/components/scatterQuote/Index';
import Timeline from '@src/pages/about/components/timeline/Timeline';
import Skills from '@src/pages/about/components/skills/Skills';
import Services from '@src/pages/about/components/services/Services';
import Process from '@src/pages/about/components/process/Process';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Priyam - About',
  description:
    'Learn about my journey, values, and commitment to quality web and app solutions.',
  keywords: [
    'Priyam',
    'About Priyam',
    'About me',
    'Full Stack Developer Journey',
    'Web Developer Story',
    'Professional Web Development',
    'Full Stack Development Expertise',
    'Web Design Skills',
    'Web Development Services',
    'AI/ML Developer',
    'Developer Profile',
    'Quality Web Solutions',
  ],
};
function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <ScatterQuote />
      <Overview />
      <Timeline />
      <Skills />
      {/* <Services />
      <Process /> */}
    </>
  );
}

export default Page;
