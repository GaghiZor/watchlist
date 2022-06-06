import ContentWrapper from "./ContentWrapper";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentWrapperWithMenu from "./ContentWrapperWithMenu";

const Layout = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;
  const [genreType, setGenreType] = useState("");

  useEffect(() => {
    if (
      asPath.includes("/popular-movies") ||
      asPath.includes("/upcoming-movies")
    ) {
      setGenreType("movie");
    } else if (asPath.includes("/tv/tv") || asPath.includes("/tv-on-air")) {
      setGenreType("tv");
    } else {
      setGenreType("");
    }
  }, [asPath]);

  if (genreType === "") {
    return (
      <>
        <Header />
        <ContentWrapper children={children} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <ContentWrapperWithMenu children={children} genreType={genreType} />
      <Footer />
    </>
  );
};

export default Layout;
