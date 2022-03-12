import ContentWrapper from "./ContentWrapper";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <style jsx>{`
        .content-wrapper {
          width: 100%;
          height: 100vh;

          padding-top: 6rem;
          padding-bottom: 6rem;
        }
      `}</style>
      <Header />
      <main className="content-wrapper">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
