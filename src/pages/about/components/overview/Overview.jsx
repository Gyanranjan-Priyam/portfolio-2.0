import AppearBlock from '@src/components/animationComponents/appearBlock/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import TooltipCard from '@src/components/animationComponents/tooltipCard/Index';
import clsx from 'clsx';
import styles from '@src/pages/about/components/overview/styles/overview.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';

function Overview() {
  const isMobile = useIsMobile();

  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.title}>
        {isMobile ? (
          <AppearTitle key="mobile-queto">
            <h3 className="h3">The front-end developer&apos;s role </h3>
            <h3 className="h3">
              is like a kind host, <span className="medium">ensuring</span>
            </h3>
            <h3 className="h3">
              visitors have a <span className="medium">smooth</span> and
            </h3>
            <h3 className="h3">
              <span className="medium">enjoyable</span> experience.
            </h3>
          </AppearTitle>
        ) : (
          <AppearTitle key="desktop-queto">
            <h3 className="h3">
              The front-end developer&apos;s role is like a
            </h3>
            <h3 className="h3">
              kind host, <span className="medium">ensuring</span> visitors have
            </h3>
            <h3 className="h3">
              a <span className="medium">smooth</span> and{' '}
              <span className="medium">enjoyable</span> experience.
            </h3>
          </AppearTitle>
        )}
      </div>
      <div className={clsx(styles.text, 'p-l', styles.myStory)}>
        <AppearTitle>
          <span>Some words</span>
        </AppearTitle>
      </div>
      <div className={styles.desc}>
        {!isMobile ? (
          <AppearTitle key="desktop-overview">
            <h6 className="h6">
              Hi! I’m a full-stack developer with a strong interest in building
              modern, scalable digital products.
            </h6>
            <h6 className="h6">
              I’m currently pursuing a B.Tech in Electrical Engineering while
              actively developing
            </h6>
            <h6 className="h6">
              real-world web and mobile applications using modern JavaScript
              technologies.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              I enjoy turning complex ideas into reliable, high-performance
              systems.
            </h6>
            <h6 className="h6">
              From event platforms to learning systems and mobile apps, I focus
              on
            </h6>
            <h6 className="h6">
              performance, scalability, and clean user experiences.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Beyond development, I’m active in tech communities and mentoring.
            </h6>
            <h6 className="h6">
              I help organize coding events, mentor junior developers, and enjoy
              competitive programming.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              I’m excited to collaborate and build impactful products.
            </h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Gyanranjan Priyam.
            </h6>
          </AppearTitle>
        ) : (
          <AppearTitle key="mobile-overview">
            <h6 className="h6">
              Hi! I’m a full-stack developer focused on building modern web and
            </h6>
            <h6 className="h6">
              mobile applications using scalable and reliable technologies.
            </h6>
            <h6 className="h6">
              I’m currently pursuing a B.Tech while actively working on real
            </h6>
            <h6 className="h6">projects that solve practical problems.</h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              I enjoy transforming ideas into high-performance platforms and
            </h6>
            <h6 className="h6">crafting smooth, user-focused experiences.</h6>
            <h6 className="h6">
              From web apps to mobile tools, I love building things that scale.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              I’m also active in tech communities and mentoring developers.
            </h6>
            <h6 className="h6">
              Coding events and competitive programming keep me learning and
              growing.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              I’m excited to collaborate and create meaningful products.
            </h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Gyanranjan Priyam.
            </h6>
          </AppearTitle>
        )}
      </div>

      {/* Educational Background & Achievements */}
      <div className={styles.sectionBlock}>
        <AppearTitle>
          <h5 className={clsx('h5', styles.sectionTitle)}>
            Educational Background &amp; Achievements
          </h5>
        </AppearTitle>
        <AppearBlock>
          <p className={clsx('h6', styles.sectionBody)}>
            I had completed my{' '}
            <TooltipCard
              containerClassName={styles.tooltipTrigger}
              content="Intermediate Completed from Divine HSS, Nayagarh, Odisha with 85 percentage mark from Science stream under CHSE Board."
            >
              <span>intermediate</span>
            </TooltipCard>{' '}
            with first division and also topper of the{' '}
            <TooltipCard
              containerClassName={styles.tooltipTrigger}
              content="Divine Higher Secondary School, Nayagarh, Odisha."
            >
              <span>College</span>
            </TooltipCard>{' '}
            in 2020. Currently, I am pursuing my{' '}
            <TooltipCard
              containerClassName={styles.tooltipTrigger}
              content="Bachelor of Technology in Electrical Engineering from Government College of Engineering, Kalahandi, Bhawanipatna, Odisha under BPUT University."
            >
              <span>B.Tech</span>
            </TooltipCard>{' '}
            from Government College of Engineering, Kalahandi. I have also
            achieved{' '}
            <TooltipCard
              containerClassName={styles.tooltipTrigger}
              content="Secured 2nd position in District Level Science Exhibition held at Nayagarh in 2019."
            >
              <span>various prizes</span>
            </TooltipCard>{' '}
            in the field of science and technology during my school and college
            time. Also I have achieved various State level{' '}
            <TooltipCard
              containerClassName={styles.tooltipTrigger}
              content="Awarded Meritorious Scholarships by the Government of Odisha for academic excellence in 2015 and 2016. Along with this I have also received the NRTS Scholarship for the year 2019."
            >
              <span>Meritorious Scholarships</span>
            </TooltipCard>{' '}
            and{' '}
            <TooltipCard
              containerClassName={styles.tooltipTrigger}
              content="Awarded 1st Prize in Quiz at District Level held at Nayagarh in 2018."
            >
              <span>Prizes</span>
            </TooltipCard>{' '}
            during my academic career.
          </p>
        </AppearBlock>
      </div>

      {/* Hobbies & Interest */}
      <div className={styles.sectionBlock}>
        <AppearTitle>
          <h5 className={clsx('h5', styles.sectionTitle)}>
            Hobbies &amp; Interest
          </h5>
        </AppearTitle>
        <AppearBlock>
          <p className={clsx('h6', styles.sectionBody)}>
            My hobbies include{' '}
            <TooltipCard
              containerClassName={styles.tooltipTrigger}
              content="I enjoy reading a wide range of books that help me expand my imagination, improve my thinking, and gain new perspectives."
            >
              <span>reading books</span>
            </TooltipCard>{' '}
            and{' '}
            <TooltipCard
              containerClassName={styles.tooltipTrigger}
              content="I love building websites, learning new web technologies, and improving my development skills through hands-on projects."
            >
              <span>web development</span>
            </TooltipCard>
            . I enjoy exploring different genres of literature and continuously
            learning through reading. Along with this, creating websites and
            working on development projects keeps me motivated to improve my
            technical skills.
          </p>
          <p className={clsx('h6', styles.sectionBody, styles.paddingTop)}>
            I also have a strong interest in{' '}
            <TooltipCard
              containerClassName={styles.tooltipTrigger}
              content="I am passionate about exploring new topics, learning about emerging fields, and conducting research to expand my understanding."
            >
              <span>research</span>
            </TooltipCard>{' '}
            across various fields. Research helps me explore new ideas, stay
            updated with advancements, and continuously gain knowledge about the
            world around me.
          </p>
        </AppearBlock>
      </div>
    </section>
  );
}
export default Overview;
