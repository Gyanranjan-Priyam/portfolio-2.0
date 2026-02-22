import { useRef } from 'react';

import clsx from 'clsx';
import styles from '@src/components/animationComponents/appearBlock/appearBlock.module.scss';
import useIntersected from '@src/hooks/useIntersected';

function AppearBlock({ children, className }) {
  const containerRef = useRef();
  const intersected = useIntersected(containerRef);

  return (
    <div
      ref={containerRef}
      className={clsx(
        styles.block,
        intersected ? styles.visible : styles.notVisible,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default AppearBlock;
