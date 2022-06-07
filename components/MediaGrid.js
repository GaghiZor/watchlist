import { Button, Grid, StackDivider, VStack } from "@chakra-ui/react";
import React from "react";

const MediaGrid = ({
  loading,
  pagesReached,
  totalMedia,
  pageTitle,
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
        <h1 className="ml-auto mr-auto text-3xl">{pageTitle}</h1>
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
        <div className="!ml-auto !mr-auto">
          {pagesReached || totalMedia < 20 ? (
            null
          ) : (
            <Button
              isLoading={loading}
              loadingText="Loading"
              colorScheme="teal"
              variant="outline"
              spinnerPlacement="end"
            />
          )}
        </div>
      </VStack>
    </>
  );
};

export default MediaGrid;
