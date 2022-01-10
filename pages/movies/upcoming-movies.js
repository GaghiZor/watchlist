import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import MovieCard from "../../components/Cards/MovieCard";

const UpcomingMovies = () => {
  const {
    data: { page, moviesUpcoming },
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
  }, [page]);

  return (
    <div>
      <h1> Upcoming Movies </h1>
      <div className="py-8 px-40 bg-gray-900">
        {moviesUpcoming &&
          moviesUpcoming.map((movie, index) => (
            <MovieCard ref={lastElementRef} key={index} media={movie} />
          ))}
      </div>
      {pagesReached ? (
        <div>No more pages to load</div>
      ) : (
        <div>Loading ... </div>
      )}
    </div>
  );
};

export default UpcomingMovies;
