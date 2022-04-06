import { Box, Flex, Stack } from "@chakra-ui/react";
import LeftMenu from "./LeftMenu";

const ContentWrapperWithMenu = ({ children, genreType }) => {
  return (
    <Stack direction={["column", "row"]} spacing="12px" className="pt-24 pb-24">
      <Box w="10vw" h="auto"></Box>
      <Box w="80vw" h="auto">
        <Flex>
          <LeftMenu genreType={genreType} />
          {children}
        </Flex>
      </Box>
      <Box w="10vw" h="auto"></Box>
    </Stack>
  );
};

export default ContentWrapperWithMenu;
