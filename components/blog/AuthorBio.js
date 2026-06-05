import styles from './AuthorBio.module.css';

export default function AuthorBio({ author }) {
  if (!author) return null;

  return (
    <div>
      <span className={styles.eyebrow}>About the author</span>
      <div className={styles.card}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.avatar}
          alt={author.name}
          className={styles.avatar}
          loading="lazy"
        />
        <div className={styles.info}>
          <strong className={styles.name}>{author.name}</strong>
          {author.role ? <span className={styles.role}>{author.role}</span> : null}
          <p className={styles.bio}>{author.bio}</p>
        </div>
      </div>
    </div>
  );
}
