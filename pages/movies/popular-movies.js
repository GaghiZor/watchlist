import { GridItem } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import MovieCard from "../../components/Cards/MovieCard";
import MediaGrid from "../../components/MediaGrid";

const Movies = () => {
  const {
    data: { page, movies, newMovies, reload },
    loading,
    setData,
    getMovies,
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
    getMovies(page);
  }, [page, reload]);

  /* Cards must have the same height */

  return (
    <div>
      <MediaGrid loading={loading} pagesReached={pagesReached} totalMedia={newMovies.length} pageTitle={"Popular Movies"}>
        {movies &&
          movies.map((movie, index) => (
            <GridItem key={index} w="100%">
              <MovieCard ref={lastElementRef} key={movie.id} media={movie} />
            </GridItem>
          ))}
      </MediaGrid>
    </div>
  );
};

export default Movies;
