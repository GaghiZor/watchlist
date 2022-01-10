import axios from "axios";
import { useContext, useEffect } from "react";
import { Constant } from "../../Constant";

const MovieDetails = ({ data }) => {
  const {
    poster_path,
    title,
    release_date,
    overview,
    vote_average,
    vote_count,
    in_production,
    backdrop_path,
    homepage,
    id,
    status,
    type,
  } = data.movieDetails;

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Page</h1>

      {data && (
        <div>
          <table className="table ">
            <tbody>
              <tr>
                <td>ID</td>
                <td>{id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{title}</td>
              </tr>
              <tr>
                <td>Score</td>
                <td>{vote_average}</td>
              </tr>
              <tr>
                  <td>Release date</td>
                  <td>{release_date}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{status}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{type}</td>
              </tr>
            </tbody>
          </table>
          <p>{overview}</p>
          {poster_path ? (
            <img src={`${Constant.IMG_300}/${poster_path}`}></img>
          ) : null}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const mediaID = params.id;

  let data = {
    movieDetails: "",
    movieGenres: [],
    movieCompanies: [],
    movieCreatedBy: [],
    movieLanguages: [],
  };

  await axios
    .get(
      `${Constant.DB_ENDPOINT}/movie/${mediaID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    )
    .then((response) => {
      const apiResponse = response.data;
      data = {
        movieDetails: apiResponse,
        movieGenres: apiResponse.genres,
        movieCompanies: apiResponse.production_companies,
      };
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: { data },
  };
};

export default MovieDetails;
