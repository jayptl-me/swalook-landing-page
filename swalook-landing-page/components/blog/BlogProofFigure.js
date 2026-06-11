'use client';

import Image from 'next/image';
import styles from './BlogProofFigure.module.css';

export default function BlogProofFigure({
  src,
  alt,
  caption,
  eyebrow = 'Product proof',
  title,
  body,
}) {
  return (
    <figure className={styles.figure}>
      <div className={styles.imageWrap}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          className={styles.image}
        />
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        {title ? <h3 className={styles.title}>{title}</h3> : null}
        {body ? <p className={styles.body}>{body}</p> : null}
        {caption ? <p className={styles.note}>{caption}</p> : null}
      </figcaption>
    </figure>
  );
}
