import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Constant } from "../Constant";
import { AppContext } from "../AppContext";

const Test = () => {
  const {
    data: { movies, series, actors },
    getMovies,
    getSeries,
    getPeople,
  } = useContext(AppContext);

  useEffect(() => {
    getMovies();
    getSeries();
    getPeople();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 bg-blue-500 place-items-center gap-4">
        <h1> MOVIES </h1>
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
        <h1> SERIES </h1>
        {series &&
          series.map((tv) => (
            <div key={tv.id}>
              <img
                src={`${Constant.IMG_500}${tv.poster_path}`}
                alt={tv.title}
              />
              <p>{tv.name}</p>
            </div>
          ))}
        <h1> ACTORS </h1>
        {actors &&
          actors.map((actor) => (
            <div key={actor.id}>
              <img
                src={`${Constant.IMG_500}/${actor.profile_path}`}
                alt={actor.name}
              />
              <p>{actor.name}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Test;
