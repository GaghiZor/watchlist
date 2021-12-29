import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import MediaCard from "../../components/MediaCard";

const UpcomingMovies = () => {
  const {
    data: { page, moviesUpcoming },
    getMoviesUpcoming,
    clearState,
  } = useContext(AppContext);

  useEffect(() => {
    getMoviesUpcoming(page);
    return () => {
        // Component unmount
        clearState();
    }
  }, [page]);
  return (
    <div>
      <h1> Upcoming Movies </h1>
      <div className="py-8 px-40 bg-gray-900">
        {moviesUpcoming &&
          moviesUpcoming.map((movie) => (
            <MediaCard key={movie.id} media={movie} />
          ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
