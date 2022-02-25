import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import TvCard from "../../components/Cards/TvCard";

const Tv = () => {
  const {
    data: { page, tv },
    loading,
    setData,
    getTv,
    clearState,
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
    getTv(page);
  }, [page]);

  return (
    <div>
      <h1> TV Shows </h1>
      <div className="py-8 px-40">
        {tv &&
          tv.map((show, index) => (
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

export default Tv;
