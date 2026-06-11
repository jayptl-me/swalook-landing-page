'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const directionOffsets = {
  up: { x: 0, y: 20 },
  down: { x: 0, y: -20 },
  left: { x: 20, y: 0 },
  right: { x: -20, y: 0 },
  none: { x: 0, y: 0 },
};

export default function BlogMotionSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
  threshold = 0.2,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = useReducedMotion();
  const offset = directionOffsets[direction] || directionOffsets.up;

  const initialState = prefersReducedMotion
    ? { opacity: 1, x: 0, y: 0 }
    : { opacity: 0, x: offset.x, y: offset.y };

  const animateState = prefersReducedMotion || isInView
    ? { opacity: 1, x: 0, y: 0 }
    : initialState;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initialState}
      animate={animateState}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 0.26,
              delay,
              ease: [0.25, 0.1, 0.25, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
}
