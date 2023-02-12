import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="description" content="Description" />
      <meta name="keywords" content="Keywords" />
      <title>RUSH</title>
      <link rel="manifest" href="/manifest.json" />
      <link
        href="/icons/logo.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icons/logo.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="/assets/icons/32.png"></link>
      <meta name="theme-color" content="#317EFB" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
