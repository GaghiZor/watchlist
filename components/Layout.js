import ContentWrapper from "./ContentWrapper";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};

export default Layout;
