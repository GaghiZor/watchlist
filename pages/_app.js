import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import AppContextProvider from "../AppContext";
// import Header from "../components/Header";
import Head from "next/head";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";
import Layout from "../components/Layout";

import Script from "next/script";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              
              page_path: window.location.pathname,
            });
        `}
      </Script>

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
