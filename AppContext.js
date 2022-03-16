import axios from "axios";
import { createContext, useState } from "react";
import { Constant } from "./Constant";
import { useSession } from "next-auth/react";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  setDoc,
  getDocs,
} from "@firebase/firestore";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    page: 1, // Default page number
    movies: [],
    moviesUpcoming: [],
    newMovies: [],

    genres: [],
    selectedGenres: [],
    genreURLIds: "",
    oldGenreURLIds: "",

    people: [],

    tv: [],
    tvOnAir: [],
    newTv: [],
  });

  const clearState = () => {
    setData({
      page: 1,

      movies: [],
      moviesUpcoming: [],
      newMovies: [],

      tv: [],
      tvOnAir: [],
      newTv: [],

      genres: [],
      selectedGenres: [],
      genreURLIds: "",
      oldGenreURLIds: "",

      people: [],
    });
  };

  const getMovies = async (page, genreURLIds = "") => {
    setLoading(true);
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/movie/popular?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&page=${page || 1}&with_genres=${genreURLIds}`
      )
      .then((response) => {
        const apiResponse = response.data;
        // Save old data and rewrite only new data
        if (data.oldGenreURLIds === genreURLIds) {
          let concatMovies = data.movies.concat(apiResponse.results);
          setData((oldData) => {
            return {
              ...oldData,
              movies: concatMovies,
              newMovies: apiResponse.results,
            };
          });
        } else {
          setData((oldData) => {
            return {
              ...oldData,
              movies: apiResponse.results,
              newMovies: apiResponse.results,
              oldGenreURLIds: genreURLIds,
            };
          });
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMoviesUpcoming = async (page, genreURLIds = "") => {
    setLoading(true);
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/movie/upcoming?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&page=${page || 1}&with_genres=${genreURLIds}`
      )
      .then((response) => {
        const apiResponse = response.data;
        if (data.oldGenreURLIds === genreURLIds) {
          let concatMoviesUpcoming = data.moviesUpcoming.concat(
            apiResponse.results
          );
          setData((oldData) => {
            return {
              ...oldData,
              moviesUpcoming: concatMoviesUpcoming,
              newMovies: apiResponse.results,
            };
          });
        } else {
          setData((oldData) => {
            return {
              ...oldData,
              moviesUpcoming: apiResponse.results,
              newMovies: apiResponse.results,
              oldGenreURLIds: genreURLIds,
            };
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTv = async (page, genreURLIds = "") => {
    setLoading(true);
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/tv/popular?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&page=${page || 1}&with_genres=${genreURLIds}`
      )
      .then((response) => {
        const apiResponse = response.data;
        if (data.oldGenreURLIds === genreURLIds) {
          let concatTv = data.tv.concat(apiResponse.results);
          setData((oldData) => {
            return { ...oldData, tv: concatTv, newTv: apiResponse.results };
          });
        } else {
          setData((oldData) => {
            return {
              ...oldData,
              tv: apiResponse.results,
              newTv: apiResponse.results,
              oldGenreURLIds: genreURLIds,
            };
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTvOnAir = async (page, genreURLIds = "") => {
    setLoading(true);
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/tv/on_the_air?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&page=${page || 1}&with_genres=${genreURLIds}`
      )
      .then((response) => {
        const apiResponse = response.data;
        if (data.oldGenreURLIds === genreURLIds) {
          let concatTvOnAir = data.tvOnAir.concat(apiResponse.results);
          setData((oldData) => {
            return {
              ...oldData,
              tvOnAir: concatTvOnAir,
              newTv: apiResponse.results,
            };
          });
        } else {
          setData((oldData) => {
            return {
              ...oldData,
              tvOnAir: apiResponse.results,
              newTv: apiResponse.results,
              oldGenreURLIds: genreURLIds,
            };
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGenres = async (type) => {
    setLoading(true);
    await axios
      .get(
        `${Constant.DB_ENDPOINT}/genre/${type}/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      )
      .then((response) => {
        const apiResponse = response.data;
        let newGenres = apiResponse.genres;
        setData((oldData) => {
          return { ...oldData, genres: newGenres };
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
        if (data.people.length > 0) {
          let concatPeople = data.people.concat(apiResponse.results);
          setData((oldData) => {
            return { ...oldData, people: concatPeople };
          });
        } else {
          setData((oldData) => {
            return { ...oldData, people: apiResponse.results };
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveToDB = async (media) => {
    if (loading) return;
    setLoading(true);

    try {
      console.log(media);
      // const docRef = await setDoc(
      //   doc(db, `users/${session.user.uid}/watchlist`, media.id.toString()),
      //   media
      // );
      // Save media ( movie / tv-show ) info
      if (media.title) {
        await setDoc(
          doc(
            db,
            `users/${session.user.uid}`,
            "watchlist_movies",
            media.id.toString()
          ),
          {
            addedInWatchlist: serverTimestamp(),
            media,
          }
        );
      } else {
        await setDoc(
          doc(
            db,
            `users/${session.user.uid}`,
            "watchlist_tv",
            media.id.toString()
          ),
          {
            addedInWatchlist: serverTimestamp(),
            media,
          }
        );
      }

      // Save user info
      const userInfo = await setDoc(doc(db, "users", session.user.uid), {
        name: session.user.name,
        username: session.user.username,
        profileImg: session.user.image,
        lastUpdate: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setLoading(false);
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
        getGenres,
        getPeople,
        clearState,
        saveToDB,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
