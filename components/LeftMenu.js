import { Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import Genres from "./Genres";

const LeftMenu = ({ genreType }) => {

  const {
    setData,
  } = useContext(AppContext);

  const handleFilter = () => {
    setData((oldData) => {
      return { ...oldData, page: 1, reload: true };
    });
  };

  return (
    <Flex flexDirection="column" flexWrap={"wrap"}>
      Filter by Genre
      <Genres type={genreType} />
      <Button m={4} onClick={handleFilter}>Apply Filters</Button>
    </Flex>
  );
};

export default LeftMenu;
