import Image from "next/image";
import styles from "./page.module.css";
import LandingGraphic from "@/components/landingGraphic/landingGraphic";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.intro}>
        <h1>Casey Eickhoff</h1>
        <h2>Senior Software Engineer</h2>
        <h3>Located in the Rocky Moutains</h3>
      </section>
      {/* <LandingGraphic /> */}
      <section className={styles.summary}>
        <h2>Howdy!</h2>
        <p>
          I’m a Senior Software Engineer with over a decade of
          experience in UX design, specializing in design systems and
          accessibility.
        </p>
        <p>
          I love blending engineering and design to create
          products that are not only functional but also user-friendly and
          delightful to use. I have a knack for leading and mentoring teams to
          achieve fantastic results and make a real impact. Let’s create
          something amazing together!
        </p>
        <p>
          I have a knack for leading and mentoring teams to
          achieve fantastic results and make a real impact. Let’s create
          something amazing together!
        </p>
      </section>
    </main>
  );
}
