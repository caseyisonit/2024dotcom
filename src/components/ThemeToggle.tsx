"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_CLASSES = [
  "swc-theme--adaptive",
  "swc-theme--light",
  "swc-theme--dark",
];

function resolvedTheme(): Theme {
  const root = document.documentElement;
  if (root.classList.contains("swc-theme--dark")) return "dark";
  if (root.classList.contains("swc-theme--light")) return "light";
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Runs before paint (inlined in <head>) so a stored choice never flashes. */
export const themeBootScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){var c=document.documentElement.classList;c.remove("swc-theme--adaptive");c.add("swc-theme--"+t)}}catch(e){}`;

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | undefined>(undefined);

  useEffect(() => setDark(resolvedTheme() === "dark"), []);

  function toggle() {
    const next: Theme = resolvedTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.remove(...THEME_CLASSES);
    root.classList.add(`swc-theme--${next}`);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(next === "dark");
  }

  return (
    <>
      <swc-action-button
        id="theme-toggle"
        quiet
        accessible-label="Dark mode"
        aria-pressed={dark === undefined ? undefined : dark}
        onClick={toggle}
      >
        <swc-icon-contrast slot="icon"></swc-icon-contrast>
      </swc-action-button>
      <swc-tooltip for="theme-toggle">
        {dark ? "Switch to light mode" : "Switch to dark mode"}
      </swc-tooltip>
    </>
  );
}
