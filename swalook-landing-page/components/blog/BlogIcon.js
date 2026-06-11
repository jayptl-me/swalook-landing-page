import { FiKey, FiStar, FiTarget, FiZap } from 'react-icons/fi';
import styles from './BlogIcon.module.css';

const iconMap = {
  Key: FiKey,
  Spark: FiStar,
  Target: FiTarget,
  Bolt: FiZap,
};

const accentMap = {
  Emerald: 'emerald',
  Amber: 'amber',
  Cyan: 'cyan',
  Violet: 'violet',
};

export default function BlogIcon({ icon = 'Key', accent = 'Emerald' }) {
  const Icon = iconMap[icon] || FiKey;
  const accentClass = accentMap[accent] || 'emerald';

  return (
    <span className={`${styles.blogIcon} ${styles[`accent${accentClass[0].toUpperCase()}${accentClass.slice(1)}`]}`}>
      <Icon aria-hidden="true" />
    </span>
  );
}
