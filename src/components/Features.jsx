import styles from '../styles/Features.module.css';

export default function Features() {
  return (
    <section className={styles.features}>
      <h2 className={styles.heading}>Why Kids Love Us!</h2>
      <div className={styles.grid}>
        <div className={styles.featureCard}>
          <div className={styles.icon}>🌟</div>
          <h3>Super Soft</h3>
          <p>Comfy all day long!</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.icon}>🎨</div>
          <h3>Fun Colors</h3>
          <p>Rainbow bright styles!</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.icon}>🚀</div>
          <h3>Adventure Ready</h3>
          <p>Built for play time!</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.icon}>💎</div>
          <h3>Quality Made</h3>
          <p>Lasts through everything!</p>
        </div>
      </div>
    </section>
  );
}
