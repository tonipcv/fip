import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Seu App" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.OneSignal = window.OneSignal || [];
              OneSignal.push(function() {
                OneSignal.init({
                  appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}",
                  safari_web_id: "${process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID}",
                  notifyButton: {
                    enable: true,
                  },
                });
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 