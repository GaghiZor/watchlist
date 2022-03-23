import { Flex } from "@chakra-ui/react";
import Genres from "./Genres";

const Filter = ({ genreType }) => {
  return (
    <Flex flexDirection="column" flexWrap={"wrap"}>
      {genreType === "movie" || genreType === "tv" ? (
        <>
          Filter by Genre
          <Genres type={genreType} />
          <button className="border-2 bg-red-600">Filter</button>
        </>
      ) : null}
    </Flex>
  );
};

export default Filter;
