import { Box, Flex, Select } from "@chakra-ui/react";
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

  /*
    Adauga buton de filtrare dupa gen
    
  */

  const handleAddGenre = (genre) => {
    setData((oldData) => {
      return {
        ...oldData,
        selectedGenres: [...selectedGenres, genre],
        genres: [...genres.filter((g) => g.id !== genre.id)],
        genreURLIds: useGenre([...selectedGenres, genre]),
        oldGenreURLIds: oldData.genreURLIds,
      };
    });
  };

  const handleRemoveGenre = (genre) => {
    setData((oldData) => {
      return {
        ...oldData,
        selectedGenres: [
          ...selectedGenres.filter((g) => g.id !== genre.id),
        ],
        genres: [...genres, genre],
        genreURLIds: useGenre([
          ...selectedGenres.filter((g) => g.id !== genre.id),
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
    <>
      <Flex flexDirection="column" flexWrap={"wrap"}>
        {selectedGenres.length > 0 ? (
          <Box borderRadius="lg" borderWidth="5px">
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
          </Box>
        ) : null}

        <Box borderRadius="lg" borderWidth="5px">
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
        </Box>
      </Flex>
    </>
  );
};

export default Genres;
