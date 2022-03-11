import { Grid, GridItem } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import TvCard from "../../components/Cards/TvCard";
import Genres from "../../components/Genres";

const TvOnAir = () => {
  const {
    data: { page, tvOnAir, genreURLIds },
    loading,
    setData,
    getTvOnAir,
  } = useContext(AppContext);

  const [pagesReached, setPagesReached] = useState(false);
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (tvOnAir.length < 20) return;
      if (observer.current) observer.current.disconnect();
      if (page === 40) {
        setPagesReached(true);
      } else {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setData((oldData) => {
              return { ...oldData, page: oldData.page + 1 };
            });
          }
        });
        if (node) observer.current.observe(node);
      }
    },
    [loading]
  );

  useEffect(() => {
    getTvOnAir(page, genreURLIds);
  }, [page, genreURLIds]);

  return (
    <div>
      <h1> TV Shows currenty on air </h1>
      <Genres type="tv" />
      <Grid templateColumns="repeat(5, 1fr)" gap={6} mx={"20"}>
        {tvOnAir &&
          tvOnAir.map((show, index) => (
            <GridItem key={index} w="100%">
              <TvCard ref={lastElementRef} key={index} media={show} />
            </GridItem>
          ))}
      </Grid>
      {pagesReached || tvOnAir.length < 20 ? (
        <div>No more pages to load</div>
      ) : (
        <div>Loading ... </div>
      )}
    </div>
  );
};

export default TvOnAir;
