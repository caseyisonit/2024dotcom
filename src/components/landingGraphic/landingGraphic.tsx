import styles from "./landingGraphic.module.css";

export default function LandingGraphic() {
  return (
    <div className={styles.landingGraphic}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Casey
          <br />
          Eickhoff
        </h1>
        <h2 className={styles.tagline}>Senior Software Engineer<br/>in the rocky mountains</h2>
      </div>
      <span className={styles.glyph}>k</span>
    </div>
  );
}
