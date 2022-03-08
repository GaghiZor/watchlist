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

    genres: [],
    selectedGenres: [],
    genreURLIds: "",
    oldGenreURLIds: "",

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

  const getMovies = async (page, genreURLIds) => {
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
          let newMovies = data.movies.concat(apiResponse.results);
          setData((oldData) => {
            return { ...oldData, movies: newMovies };
          });
        } else {
          setData((oldData) => {
            return { ...oldData, movies: apiResponse.results, oldGenreURLIds: genreURLIds };
          });
        }

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
        let newMoviesUpcoming = data.moviesUpcoming.concat(apiResponse.results);
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
        let newTv = data.tv.concat(apiResponse.results);
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
        let newTvOnAir = data.tvOnAir.concat(apiResponse.results);
        setData((oldData) => {
          return { ...oldData, tvOnAir: newTvOnAir };
        });
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
        let newPeople = data.people.concat(apiResponse.results);
        setData((oldData) => {
          return { ...oldData, people: newPeople };
        });
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
