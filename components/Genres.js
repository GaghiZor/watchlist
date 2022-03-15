import { Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import useGenre from "./Hooks/useGenre";

const Genres = ({ type }) => {
  const {
    data: { page, genres, selectedGenres },
    getGenres,
    setData,
    clearState,
  } = useContext(AppContext);

  const handleAddGenre = (genre) => {
    setData((oldData) => {
      return {
        ...oldData,
        selectedGenres: [...oldData.selectedGenres, genre],
        genres: [...oldData.genres.filter((g) => g.id !== genre.id)],
        page: 1,
        genreURLIds: useGenre([...oldData.selectedGenres, genre]),
        oldGenreURLIds: oldData.genreURLIds,
      };
    });
  };

  const handleRemoveGenre = (genre) => {
    setData((oldData) => {
      return {
        ...oldData,
        selectedGenres: [
          ...oldData.selectedGenres.filter((g) => g.id !== genre.id),
        ],
        genres: [...oldData.genres, genre],
        page: 1,
        genreURLIds: useGenre([
          ...oldData.selectedGenres.filter((g) => g.id !== genre.id),
        ]),
        oldGenreURLIds: oldData.genreURLIds,
      };
    });
  };

  useEffect(() => {
    getGenres(type);

    return () => {
      clearState();
    };
  }, [type]);

  return (
    <Flex flexDirection={"row"} m={"2"} flexWrap={"wrap"}>
      {selectedGenres &&
        selectedGenres.map((selectedGenre) => (
          <div
            key={selectedGenre.id}
            className="cursor-pointer text-cyan-500 m-2"
            onClick={() => handleRemoveGenre(selectedGenre)}
          >
            {selectedGenre.name}
          </div>
        ))}

      {genres &&
        genres.map((genre) => (
          <div
            key={genre.id}
            className="cursor-pointer m-2"
            onClick={() => handleAddGenre(genre)}
          >
            {genre.name}
          </div>
        ))}
    </Flex>
  );
};

export default Genres;
