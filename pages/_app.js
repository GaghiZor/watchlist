import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import AppContextProvider from "../AppContext";
// import Header from "../components/Header";
import Head from "next/head";
import Footer from "../components/Footer";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
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
          <Footer />
        </AppContextProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
