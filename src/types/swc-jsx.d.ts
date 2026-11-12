import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type {
  Accordion,
  AccordionItem,
} from "@adobe/spectrum-wc/components/accordion";
import type { ActionButton } from "@adobe/spectrum-wc/components/action-button";
import type { Avatar } from "@adobe/spectrum-wc/components/avatar";
import type { Badge } from "@adobe/spectrum-wc/components/badge";
import type { Button } from "@adobe/spectrum-wc/components/button";
import type { Card } from "@adobe/spectrum-wc/components/card";
import type { Divider } from "@adobe/spectrum-wc/components/divider";
import type { Icon } from "@adobe/spectrum-wc/components/icon";
import type { Menu } from "@adobe/spectrum-wc/components/menu";
import type { Meter } from "@adobe/spectrum-wc/components/meter";
import type { Asset } from "@adobe/spectrum-wc/components/asset";
import type { Popover } from "@adobe/spectrum-wc/components/popover";
import type { StatusLight } from "@adobe/spectrum-wc/components/status-light";
import type { Tab, TabPanel, Tabs } from "@adobe/spectrum-wc/components/tabs";
import type { Tooltip } from "@adobe/spectrum-wc/components/tooltip";

type KebabCase<S extends string> = S extends `${infer Head}${infer Tail}`
  ? `${Head extends Lowercase<Head> ? Head : `-${Lowercase<Head>}`}${KebabCase<Tail>}`
  : S;

type Primitive = string | number | boolean | null | undefined;

type LitLifecycleFlags = "hasUpdated" | "isUpdatePending";

// Public element properties with primitive values, exposed under their
// kebab-case attribute names so server-rendered HTML carries real attributes.
type ElementAttributes<E extends HTMLElement> = {
  [K in Exclude<keyof E, keyof HTMLElement | LitLifecycleFlags> as K extends string
    ? E[K] extends Primitive
      ? KebabCase<K>
      : never
    : never]?: E[K];
};

// Workflow icon elements from @adobe/spectrum-wc-icons share IconBase's API.
type SwcIconProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  size?: "xs" | "s" | "m" | "l" | "xl";
  "accessible-label"?: string;
};

type SwcElementProps<E extends HTMLElement> = DetailedHTMLProps<
  HTMLAttributes<E>,
  E
> &
  ElementAttributes<E>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "swc-accordion": SwcElementProps<Accordion>;
      "swc-accordion-item": SwcElementProps<AccordionItem>;
      "swc-action-button": SwcElementProps<ActionButton>;
      "swc-avatar": SwcElementProps<Avatar>;
      "swc-badge": SwcElementProps<Badge>;
      "swc-button": SwcElementProps<Button>;
      "swc-card": SwcElementProps<Card>;
      "swc-divider": SwcElementProps<Divider>;
      "swc-icon": SwcElementProps<Icon>;
      "swc-menu": SwcElementProps<Menu>;
      "swc-meter": SwcElementProps<Meter>;
      "swc-asset": SwcElementProps<Asset>;
      "swc-icon-contrast": SwcIconProps;
      "swc-icon-menu-hamburger": SwcIconProps;
      "swc-icon-chevron-right": SwcIconProps;
      "swc-icon-arrow-ui-right": SwcIconProps;
      "swc-popover": SwcElementProps<Popover>;
      "swc-status-light": SwcElementProps<StatusLight>;
      "swc-tab": SwcElementProps<Tab>;
      "swc-tab-panel": SwcElementProps<TabPanel>;
      "swc-tabs": SwcElementProps<Tabs>;
      "swc-tooltip": SwcElementProps<Tooltip>;
    }
  }
}
