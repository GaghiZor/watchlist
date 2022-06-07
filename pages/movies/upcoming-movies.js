import { GridItem } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import MovieCard from "../../components/Cards/MovieCard";
import MediaGrid from "../../components/MediaGrid";

const UpcomingMovies = () => {
  const {
    data: { page, moviesUpcoming, newMovies, reload },
    loading,
    setData,
    getMoviesUpcoming,
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
    getMoviesUpcoming(page);
  }, [page, reload]);

  return (
    <div>
      <MediaGrid loading={loading} pagesReached={pagesReached} totalMedia={newMovies.length} pageTitle={"Upcoming Movies"}>
        {moviesUpcoming &&
          moviesUpcoming.map((movie, index) => (
            <GridItem key={index} w="100%">
              <MovieCard ref={lastElementRef} key={movie.id} media={movie} />
            </GridItem>
          ))}
      </MediaGrid>
    </div>
  );
};

export default UpcomingMovies;
