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
import Header from "../components/Header";

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const saveToDB = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Save media ( movie / tv-show ) info
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

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      

      {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
        

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          {session ? (
            <div className="flex flex-col">
              {info.props.nameProps}
              <button onClick={handleClick}>Click</button>
              <button className="" onClick={signOut}>
              Sign out
            </button>
            <button className="" type="button" onClick={saveToDB}>
              Save to DB
            </button>
            {loading && <p>Loading...</p>}
            </div>
          ) : (
            <a href="/api/auth/signin">Sign in</a>
          )}
        </main>
      </div> */}
    </>
  );
}
