import { Grid, GridItem } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import MovieCard from "../../components/Cards/MovieCard";
import Genres from "../../components/Genres";

const UpcomingMovies = () => {
  const {
    data: { page, moviesUpcoming, newMovies, genreURLIds },
    loading,
    setData,
    getMoviesUpcoming,
    clearState,
  } = useContext(AppContext);

  const [pagesReached, setPagesReached] = useState(false);
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (newMovies.length < 20 && newMovies.length !== 0) return;
      if (observer.current) observer.current.disconnect();
      if (page === 40) {
        setPagesReached(true);
      } else {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setData((oldData) => {
              return { ...oldData, page: oldData.page + 1 };
            });
          }
        });
        if (node) observer.current.observe(node);
      }
    },
    [loading]
  );

  useEffect(() => {
    getMoviesUpcoming(page, genreURLIds);
  }, [page, genreURLIds]);

  return (
    <div>
      <h1> Upcoming Movies </h1>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} mx={"20"}>
        {moviesUpcoming &&
          moviesUpcoming.map((movie, index) => (
            <GridItem key={index} w="100%">
              <MovieCard ref={lastElementRef} key={movie.id} media={movie} />
            </GridItem>
          ))}
      </Grid>
      {pagesReached || newMovies.length < 20 ? (
        <div>No more pages to load</div>
      ) : (
        <div>Loading ... </div>
      )}
    </div>
  );
};

export default UpcomingMovies;
