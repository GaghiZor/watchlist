import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import TvCard from "../../components/Cards/TvCard";

const TvOnAir = () => {
  const {
    data: { page, tvOnAir },
    loading,
    setData,
    getTvOnAir,
  } = useContext(AppContext);

  const [pagesReached, setPagesReached] = useState(false);
  const observer = useRef();

  const lastElementRef = useCallback(
		(node) => {
			if (loading) return;
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
  }, [page]);

  return (
    <div>
      <h1> TV Shows currenty on air </h1>
      <div className="py-8 px-40">
        {tvOnAir &&
          tvOnAir.map((show, index) => (
            <TvCard ref={lastElementRef} key={index} media={show} />
          ))}
      </div>
      {pagesReached ? (
        <div>No more pages to load</div>
      ) : (
        <div>Loading ... </div>
      )}
    </div>
  );
};

export default TvOnAir;
