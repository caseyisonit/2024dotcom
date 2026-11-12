import { Headline } from "@/components/Headline";

// Shell check only. The real Home page arrives in step 4.
export default function Home() {
  return (
    <section className="section grid" aria-labelledby="hero-title">
      <div className="cell" style={{ gridColumn: "1 / -1" }}>
        <Headline id="hero-title" text={"Casey\nis **on it:**"} className="hero-title" />
      </div>
    </section>
  );
}
