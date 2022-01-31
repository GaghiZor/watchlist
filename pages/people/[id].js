import axios from "axios";
import { useContext, useEffect } from "react";
import { Constant } from "../../Constant";

const TvShowDetails = ({ data }) => {
  const {
    id,
    name,
    birthday,
    known_for_department,
    profile_path,
    popularity,
    biography,
    also_known_as,
  } = data.personDetails;

  useEffect(() => {}, []);

  return (
    <div>
      <h1 className="text-2xl m-4">{name}</h1>

      {data && (
        <div>
          <table className="table ">
            <tbody>
              <tr>
                <td>ID</td>
                <td>{id}</td>
              </tr>
              <tr>
                <td>Popularity</td>
                <td>{popularity}</td>
              </tr>
              <tr>
                <td>Birhtday</td>
                <td>{birthday}</td>
              </tr>
              <tr>
                <td>Knwon for</td>
                <td>{known_for_department}</td>
              </tr>
              <tr>
                <td>Also known as</td>
                <td>{also_known_as.map((name) => <span>{name} | </span>)}</td>
              </tr>
            </tbody>
          </table>
          <p>{biography}</p>
          {profile_path ? (
            <img src={`${Constant.IMG_300}/${profile_path}`}></img>
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

  };

  await axios
    .get(
      `${Constant.DB_ENDPOINT}/person/${mediaID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    )
    .then((response) => {
      const apiResponse = response.data;
      data = {
        personDetails: apiResponse,
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
