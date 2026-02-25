import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import AppearBlock from '@src/components/animationComponents/appearBlock/Index';
import Image from 'next/image';
import clsx from 'clsx';
import skills from '@src/pages/about/components/skills/constants/skills';
import styles from '@src/pages/about/components/skills/styles/skills.module.scss';

function Skills() {
  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.header}>
        <AppearTitle>
          <p className={clsx(styles.sectionLabel, 'p-x')}>Tech Stack</p>
          <h3 className="h3">Skills &amp; Technologies</h3>
        </AppearTitle>
      </div>

      <div className={styles.categories}>
        {skills.map((group) => (
          <AppearBlock key={group.category}>
            <div className={styles.category}>
              <p className={clsx(styles.categoryTitle, 'p-x')}>
                {group.category}
              </p>
              <div className={styles.items}>
                {group.items.map((skill) => (
                  <span
                    key={skill.name}
                    className={clsx(styles.skillItem, 'p-x')}
                  >
                    {skill.icon && (
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={16}
                        height={16}
                        className={styles.skillIcon}
                      />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </AppearBlock>
        ))}
      </div>
    </section>
  );
}

export default Skills;
