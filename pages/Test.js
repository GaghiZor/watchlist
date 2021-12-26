import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Constant } from "../Constant";
import { AppContext } from "../AppContext";

const Test = () => {
  // const [movies, setMovies] = useState([]);
  const { data: { movies, series }, getMovies, getSeries } = useContext(AppContext);

  useEffect(() => {
    getMovies();
    getSeries();
  }, []);

  return (
    <>
      {/* <div className="grid grid-cols-5 space-x-5 space-y-5 bg-red-500">
        {movies &&
          movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={`${Constant.IMG_500}${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}

        {series &&
          series.map((tv) => (
            <div key={tv.id}>
              <img src={`${Constant.IMG_500}${tv.poster_path}`} alt={tv.name} />
              <p>{tv.name}</p>
            </div>
          ))}
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 bg-blue-500 place-items-center gap-4">
            {movies && movies.map((movie) => (
                <div key={movie.id}>
                <img
                  src={`${Constant.IMG_500}${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
            {series && series.map((tv) => (
                <div key={tv.id}>
                <img
                  src={`${Constant.IMG_500}${tv.poster_path}`}
                  alt={tv.title}
                />
                <p>{tv.name}</p>
              </div>
            ))}
          </div>
    </>
  );
};

export default Test;
