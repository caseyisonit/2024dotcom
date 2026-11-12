"use client";

import { useEffect } from "react";

// SWC element modules touch `window` and `customElements` at evaluation time,
// so they must only load in the browser. Dynamic imports inside an effect keep
// them out of the server render entirely.
function registerElements() {
  return Promise.all([
    import("@adobe/spectrum-wc/components/accordion/swc-accordion.js"),
    import("@adobe/spectrum-wc/components/accordion/swc-accordion-item.js"),
    import("@adobe/spectrum-wc/components/action-button/swc-action-button.js"),
    import("@adobe/spectrum-wc/components/avatar/swc-avatar.js"),
    import("@adobe/spectrum-wc/components/badge/swc-badge.js"),
    import("@adobe/spectrum-wc/components/button/swc-button.js"),
    import("@adobe/spectrum-wc/components/card/swc-card.js"),
    import("@adobe/spectrum-wc/components/divider/swc-divider.js"),
    import("@adobe/spectrum-wc/components/icon/swc-icon.js"),
    import("@adobe/spectrum-wc/components/menu/swc-menu.js"),
    import("@adobe/spectrum-wc/components/popover/swc-popover.js"),
    import("@adobe/spectrum-wc/components/status-light/swc-status-light.js"),
    import("@adobe/spectrum-wc/components/tabs/swc-tabs.js"),
    import("@adobe/spectrum-wc/components/tabs/swc-tab.js"),
    import("@adobe/spectrum-wc/components/tabs/swc-tab-panel.js"),
    import("@adobe/spectrum-wc/components/tooltip/swc-tooltip.js"),
  ]);
}

export function SwcRegistry() {
  useEffect(() => {
    registerElements().catch((error: unknown) => {
      console.error("Failed to register Spectrum Web Components", error);
    });
  }, []);

  return null;
}
