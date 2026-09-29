"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => unknown;
    };
  }
}

export function VLibras() {
  useEffect(() => {
    if (document.getElementById("vlibras-script")) {
      if (window.VLibras) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "vlibras-script";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      {...{
        vw: "true",
        className: "enabled",
        "aria-label": "Acessibilidade em Libras"
      }}
    >
      <div {...{ "vw-access-button": "true", className: "active" }} />
      <div {...{ "vw-plugin-wrapper": "true" }}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
