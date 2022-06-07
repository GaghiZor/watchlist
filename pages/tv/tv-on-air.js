import { GridItem } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import TvCard from "../../components/Cards/TvCard";
import MediaGrid from "../../components/MediaGrid";

const TvOnAir = () => {
  const {
    data: { page, tvOnAir, newTv, reload },
    loading,
    setData,
    getTvOnAir,
  } = useContext(AppContext);

  const [pagesReached, setPagesReached] = useState(false);
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (newTv.length < 20 && newTv.length !== 0) return;
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
    getTvOnAir(page);
  }, [page, reload]);

  return (
    <div>
      <MediaGrid loading={loading} pagesReached={pagesReached} totalMedia={newTv.length} pageTitle={"TV Shows Currently Airing"}>
        {tvOnAir &&
          tvOnAir.map((show, index) => (
            <GridItem key={index} w="100%">
              <TvCard ref={lastElementRef} key={show.id} media={show} />
            </GridItem>
          ))}
      </MediaGrid>
    </div>
  );
};

export default TvOnAir;
