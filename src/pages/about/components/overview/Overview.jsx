import AppearBlock from '@src/components/animationComponents/appearBlock/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import Image from 'next/image';
import TooltipCard from '@src/components/animationComponents/tooltipCard/Index';
import clsx from 'clsx';
import styles from '@src/pages/about/components/overview/styles/overview.module.scss';

function Overview() {
  return (
    
      <section className={clsx(styles.root, 'layout-grid-inner')}>
        <div className={styles.sectionBlock}>
          <AppearTitle>
            <h5 className={clsx('h5', styles.sectionTitle)}>About Me</h5>
          </AppearTitle>

          <AppearBlock>
            <p className={clsx('h6', styles.sectionBody)}>
              I am an{' '}
              <TooltipCard
                containerClassName={styles.tooltipTrigger}
                content={
                  <div className={styles.tooltipImageCard}>
                    <div className={styles.tooltipImageWrap}>
                      <Image
                        src="/priyams/img2.webp"
                        alt="Gyanranjan Priyam"
                        fill
                        sizes="240px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <p className={styles.tooltipImageCaption}>
                      You can call me Priyam.
                    </p>
                  </div>
                }
              >
                <span>Gyanranjan Priyam</span>
              </TooltipCard>{' '}
              with a strong passion for{' '}
              <TooltipCard
                containerClassName={styles.tooltipTrigger}
                content="Interested in modern technologies, software development, and digital product building."
              >
                <span>technology</span>
              </TooltipCard>{' '}
              and{' '}
              <TooltipCard
                containerClassName={styles.tooltipTrigger}
                content="Focused on building responsive, scalable and user friendly web applications."
              >
                <span>web development</span>
              </TooltipCard>
              . Alongside my core studies, I work as a{' '}
              <TooltipCard
                containerClassName={styles.tooltipTrigger}
                content="Experience in both front end and back end technologies."
              >
                <span>software developer</span>
              </TooltipCard>{' '}
              who enjoys building{' '}
              <TooltipCard
                containerClassName={styles.tooltipTrigger}
                content="Applications that balance performance, usability and clean design."
              >
                <span>efficient and user-centric digital experiences</span>
              </TooltipCard>
              . I love exploring new tools, learning continuously, and turning
              ideas into{' '}
              <TooltipCard
                containerClassName={styles.tooltipTrigger}
                content="Real world applications that solve practical problems."
              >
                <span>practical solutions</span>
              </TooltipCard>
              .
            </p>
          </AppearBlock>
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
              in the field of science and technology during my school and
              college time. Also I have achieved various State level{' '}
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
              . I enjoy exploring different genres of literature and
              continuously learning through reading. Along with this, creating
              websites and working on development projects keeps me motivated to
              improve my technical skills.
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
              updated with advancements, and continuously gain knowledge about
              the world around me.
            </p>
          </AppearBlock>
        </div>
      </section>
  );
}
export default Overview;
