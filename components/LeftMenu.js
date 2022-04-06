import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import Genres from "./Genres";

const LeftMenu = ({ genreType }) => {
  const {
    data: { page, genreURLIds },
    getMovies,
  } = useContext(AppContext);

  return (
    <Flex flexDirection="column" flexWrap={"wrap"}>
      Filter by Genre
      <Genres type={genreType} />
    </Flex>
  );
};

export default LeftMenu;
