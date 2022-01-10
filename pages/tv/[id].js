import axios from "axios";
import { useContext, useEffect } from "react";
import { Constant } from "../../Constant";

const TvShowDetails = ({ data }) => {
  const {
    poster_path,
    overview,
    name,
    vote_average,
    vote_count,
    first_air_date,
    last_air_date,
    in_production,
    backdrop_path,
    homepage,
    id,
    status,
    type,
    next_episode_to_air,
    number_of_episodes,
    number_of_seasons,
  } = data.tvDetails;

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
                <td>{name}</td>
              </tr>
              <tr>
                <td>Release Date</td>
                <td>{first_air_date}</td>
              </tr>
              <tr>
                <td>Last Episode</td>
                <td>{last_air_date}</td>
              </tr>
              <tr>
                <td>Score</td>
                <td>{vote_average}</td>
              </tr>
              <tr>
                <td>Episodes</td>
                <td>{number_of_episodes}</td>
              </tr>
              <tr>
                <td>Seasons</td>
                <td>{number_of_seasons}</td>
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
    tvDetails: "",
    tvGenres: [],
    tvCompanies: [],
    tvCreatedBy: [],
    tvSeasons: [],
    tvLanguages: [],
    tvLastEpisodeToAir: "",
  };

  await axios
    .get(
      `${Constant.DB_ENDPOINT}/tv/${mediaID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    )
    .then((response) => {
      const apiResponse = response.data;
      data = {
        tvDetails: apiResponse,
        tvGenres: apiResponse.genres,
        tvCompanies: apiResponse.production_companies,
        tvCreatedBy: apiResponse.created_by,
        tvSeasons: apiResponse.seasons,
        tvLanguages: apiResponse.languages,
        tvLastEpisodeToAir: apiResponse.last_episode_to_air,
      };
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: { data },
  };
};

export default TvShowDetails;
