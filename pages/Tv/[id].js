import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";

export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    };
}

const TvShow = () => {
  const router = useRouter();
  const { media: mediaID } = router.query;

  const {
    data: {
      tvDetails,
      tvGenres,
      tvCompanies,
      tvCreatedBy,
      tvSeasons,
      tvLanguages,
      tvLastEpisodeToAir,
    },
    loading,
    getTvDetails,
    clearState,
  } = useContext(AppContext);

  useEffect(() => {
    getTvDetails(mediaID);
  }, [mediaID]);

  return (
    <div>
      <h1>{tvDetails.id}</h1>
    </div>
  );
};

export default TvShow;

// {tvDetails && (
//     <div>
//     <table className={style.tabel}>
//     <tbody>
//         <tr>
//             <td className={style.tdd}>ID</td>
//             <td className={style.tdd}>{tvDetails.id}</td>
//         </tr>
//         <tr>
//             <td className={style.tdd}>Name</td>
//             <td className={style.tdd}>{tvDetails.name}</td>
//         </tr>
//         <tr>
//             <td className={style.tdd}>Release Date</td>
//             <td className={style.tdd}>{tvDetails.first_air_date}</td>
//         </tr>
//         <tr>
//             <td className={style.tdd}>Last Episode</td>
//             <td className={style.tdd}>{tvDetails.last_air_date}</td>
//         </tr>
//         <tr>
//             <td className={style.tdd}>Score</td>
//             <td className={style.tdd}>{tvDetails.vote_average}</td>
//         </tr>
//         <tr>
//             <td className={style.tdd}>Episodes</td>
//             <td className={style.tdd}>{tvDetails.number_of_episodes}</td>
//         </tr>
//         <tr>
//             <td className={style.tdd}>Seasons</td>
//             <td className={style.tdd}>{tvDetails.number_of_seasons}</td>
//         </tr>
//     </tbody>
//     </table>
//     {tvDetails.poster_path ? (<img src={`${Constant.IMG_300}/${tvDetails.poster_path}`}></img>) : null}
// </div>
// )}