import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import MediaCard from "../../components/MediaCard";

const UpcomingMovies = () => {
  const {
    data: { page, seriesOnAir },
    getSeriesOnAir,
    clearState,
  } = useContext(AppContext);

  useEffect(() => {
    getSeriesOnAir(page);
  }, [page]);
  return (
    <div>
      <h1> TV Shows currenty on air </h1>
      <div className="py-8 px-40 bg-gray-900">
        {seriesOnAir &&
          seriesOnAir.map((tv) => (
            <MediaCard key={tv.id} media={tv} />
          ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
