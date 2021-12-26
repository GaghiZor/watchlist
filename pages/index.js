import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  setDoc,
  getDocs,
} from "@firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../AppContext";

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const { data } = useContext(AppContext);

  const movieData = {
    name: "Spider-Man",
    year: "2000",
    language: "en",
    id: 123241,
  };

  const saveToDB = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Save media ( movie / tvshow ) info
      const docRef = await setDoc(
        doc(db, `users/${session.user.uid}/watchlist`, movieData.id.toString()),
        movieData
      );

      // Save user info
      const userInfo = await updateDoc(doc(db, "users", session.user.uid), {
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

  const [info, setInfo] = useState({
    name: "test",
    props: {
      nameProps: "nameProps",
    },
  });

  const handleClick = () => {
    const newData = {
      nameProps: "new data",
    };
    console.log(info);
    setInfo({ ...info, props: newData });
    console.log(info);
  };

  useEffect(() => {
    console.log(info)
    return () => {
    }
  }, [info])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {session ? (
          <div className="flex flex-col">
            {info.props.nameProps}
            <button onClick={handleClick}>Click</button>
            {/* <button className="" onClick={signOut}>
              Sign out
            </button>
            <button className="" type="button" onClick={saveToDB}>
              Save to DB
            </button>
            {loading && <p>Loading...</p>} */}
          </div>
        ) : (
          <a href="/api/auth/signin">Sign in</a>
        )}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
