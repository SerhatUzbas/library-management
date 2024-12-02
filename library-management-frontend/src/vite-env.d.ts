/// <reference types="vite/client" />

declare const __APP_VERSION__: string;
declare const __APP_ENV__: string;
declare const __APP_BUILD__: string;
declare const __API_URL__: string;
declare const __CAPTCHA_SITE_KEY__: string;
declare const __TINY_API_KEY__: string;

declare module "*.png";
declare module "*.svg" {
  import React from "react";
  export const ReactComponent:
    | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    | string;
  const src: string;
  export default src;
}
