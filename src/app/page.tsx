export default function Home() {
  return (
    <main>
      <h1>SWC gen2 smoke test</h1>
      <p>
        Theme follows the system light/dark preference via
        <code> swc-theme--adaptive</code> on the root element.
      </p>
      <swc-divider size="s"></swc-divider>
      <p>
        <swc-button variant="accent">Accent button</swc-button>{" "}
        <swc-badge variant="positive">Badge</swc-badge>
      </p>
    </main>
  );
}
