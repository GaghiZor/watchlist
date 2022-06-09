import { Button, Grid, StackDivider, VStack } from "@chakra-ui/react";
import React from "react";

const MediaGridSearch = ({
  loading,
  children,
}) => {
  return (
    <>
      <VStack
        // divider={<StackDivider borderColor="gray.200" />}
        spacing={5}
        align="stretch"
        margin={["10", "10", "10", "10"]}
      >
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={6}
          mx={"20"}
        >
          {children}
        </Grid>
      </VStack>
    </>
  );
};

export default MediaGridSearch;
