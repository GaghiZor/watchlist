import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import AppContextProvider from "../AppContext";
// import Header from "../components/Header";
import Head from "next/head";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";
import Script from "next/script";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <SessionProvider session={session}>
        <ChakraProvider>
          <AppContextProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Head>
              <title>WatchList Tracker</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppContextProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
