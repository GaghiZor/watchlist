import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import MediaCard from "../../components/MediaCard";

const Movies = () => {
  const {
    data: { page, movies },
    loading,
    setData,
    getMovies,
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
    getMovies(page);
    return () => {
      clearState();
    }
  }, [page]);

  return (
    <div>
      <h1> Movies </h1>
      <div className="py-8 px-40 bg-gray-900">
        {movies &&
          movies.map((movie, index) => (
            <MediaCard ref={lastElementRef} key={index} media={movie} />
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

export default Movies;
