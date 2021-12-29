import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import AppContextProvider from "../AppContext";
import Header from "../components/Header";
import Head from "next/head";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Head>
          <title>WatchList Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <Component {...pageProps} />
        <Footer />
      </AppContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
