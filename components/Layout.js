import ContentWrapper from "./ContentWrapper";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Center, Flex, Square, Stack, Text } from "@chakra-ui/react";
import Genres from "./Genres";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

const Layout = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;
  const [genreType, setGenreType] = useState("");
  const { clearState } = useContext(AppContext);

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

  return (
    <>
      <Header />
      <Stack
        direction={["column", "row"]}
        spacing="12px"
        className="pt-24 pb-24"
      >
        <ContentWrapper children={children} genreType={genreType} />
      </Stack>
      <Footer />
    </>
  );
};

export default Layout;
