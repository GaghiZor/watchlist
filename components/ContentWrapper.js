import { Box, Stack } from "@chakra-ui/react";

const ContentWrapper = ({ children }) => {
  return (
    <Stack direction={["column", "row"]} spacing="12px" className="pt-24 pb-24">
      <Box w="10vw" h="auto"></Box>
      <Box w="80vw" h="auto">
        {children}
      </Box>
      <Box w="10vw" h="auto"></Box>
    </Stack>
  );
};

export default ContentWrapper;
