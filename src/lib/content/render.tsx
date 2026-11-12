import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { compileMDX } from "next-mdx-remote/rsc";

import { LayersDiagram } from "@/components/LayersDiagram";

import { headingId } from "./text";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
}

/*
 * Markdown → page elements. Post bodies may also use SWC elements directly
 * (for example `<swc-badge>`), which pass through as custom elements.
 */
const components = {
  LayersDiagram,
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2 id={headingId(textOf(children))} className="headline headline--heading prose-h2" {...props}>
      {children}
    </h2>
  ),
  blockquote: ({ children }: ComponentPropsWithoutRef<"blockquote">) => (
    <figure className="pull-quote">
      <blockquote>{children}</blockquote>
    </figure>
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => <pre className="code-block" {...props} />,
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => (
    <a href={href} className="swc-Link" {...(href.startsWith("http") ? { rel: "noopener" } : {})} {...props} />
  ),
};

export async function renderBody(source: string) {
  const { content } = await compileMDX({ source, components });
  return content;
}
