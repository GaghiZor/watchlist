import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import MediaCard from "../../components/MediaCard";

const Series = () => {
  const {
    data: { page, series },
    getSeries,
  } = useContext(AppContext);

  useEffect(() => {
    getSeries(page);
  }, [page]);
  return (
    <div>
      <h1> TV Shows </h1>
      <div className="py-8 px-40 bg-gray-900">
        {series &&
          series.map((tv) => (
            <MediaCard key={tv.id} media={tv}/>
          ))}
      </div>
    </div>
  );
};

export default Series;
