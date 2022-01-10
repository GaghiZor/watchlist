import axios from "axios";
import { createContext, useState } from "react";
import { Constant } from "./Constant";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    page: 1, // Default page number
    movies: [],
    moviesUpcoming: [],

    people: [],

    tv: [],
    tvOnAir: [],
  });

  const clearState = () => {
    setData({
      page: 1,
      movies: [],
      moviesUpcoming: [],

      people: [],

      tv: [],
      tvOnAir: [],
    });
  };

  const getMovies = async (page) => {
    setLoading(true);
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/movie/popular?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&page=${page || 1}`
      )
      .then((response) => {
        const apiResponse = response.data;
        // Save old data and rewrite only new data
        var newMovies = data.movies.concat(apiResponse.results);
        setData((oldData) => {
          return { ...oldData, movies: newMovies };
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMoviesUpcoming = async (page) => {
    setLoading(true);
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/movie/upcoming?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&page=${page || 1}`
      )
      .then((response) => {
        const apiResponse = response.data;
        var newMoviesUpcoming = data.moviesUpcoming.concat(apiResponse.results);
        setData((oldData) => {
          return { ...oldData, moviesUpcoming: newMoviesUpcoming };
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTv = async (page) => {
    setLoading(true);
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/tv/popular?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&page=${page || 1}`
      )
      .then((response) => {
        const apiResponse = response.data;
        var newTv = data.tv.concat(apiResponse.results);
        setData((oldData) => {
          return { ...oldData, tv: newTv };
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTvOnAir = async (page) => {
    setLoading(true);
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/tv/on_the_air?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&page=${page || 1}`
      )
      .then((response) => {
        const apiResponse = response.data;
        var newTvOnAir = data.tvOnAir.concat(apiResponse.results);
        setData((oldData) => {
          return { ...oldData, tvOnAir: newTvOnAir };
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPeople = async (page) => {
    setLoading(true);
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/person/popular?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&page=${page || 1}`
      )
      .then((response) => {
        const apiResponse = response.data;
        var newPeople = data.people.concat(apiResponse.results);
        setData((oldData) => {
          return { ...oldData, people: newPeople };
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AppContext.Provider
      value={{
        data,
        loading,
        setData,
        getMovies,
        getMoviesUpcoming,
        getTv,
        getTvOnAir,
        getPeople,
        clearState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
