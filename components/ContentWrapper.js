import { Box } from "@chakra-ui/react";
import Genres from "./Genres";

const ContentWrapper = ({ children, genreType }) => {
  return (
    <>
      <Box w="10vw" h="auto">
        {genreType === "movie" || genreType === "tv" ? (
          <Genres type={genreType} />
        ) : null}
      </Box>
      <Box w="80vw" h="auto">
        {children}
      </Box>
      <Box w="10vw" h="auto">
      </Box>
    </>
  );
};

export default ContentWrapper;
