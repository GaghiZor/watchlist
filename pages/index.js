import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import Header from "../components/Header";

export default function Home() {

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
