import { Box, Flex } from "@chakra-ui/react";
import Filter from "./Filter";
import Genres from "./Genres";

const ContentWrapper = ({ children, genreType }) => {
  return (
    <>
      <Box w="10vw" h="auto"></Box>
      <Box w="80vw" h="auto">
        <Flex>
          <Filter genreType={genreType} />
          {children}
        </Flex>
      </Box>
      <Box w="10vw" h="auto"></Box>
    </>
  );
};

export default ContentWrapper;
