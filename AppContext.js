import axios from "axios";
import { createContext, useState } from "react";
import { Constant } from "./Constant";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [actors, setActors] = useState([]);

  const [data, setData] = useState({
    movies: [],
    series: [],
  });

  const getSeries = async (page) => {
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page || 1}`
      )
      .then((response) => {
        const apiResponse = response.data;
        // Save old data and rewrite only new data
        setData((oldData) => {
          return { ...oldData, series: apiResponse.results };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMovies = async (page) => {
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page || 1}`
      )
      .then((response) => {
        const apiResponse = response.data;
        setData((oldData) => {
            return { ...oldData, movies: apiResponse.results };
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AppContext.Provider value={{ data, movies, series, getMovies, getSeries }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
