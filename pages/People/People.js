import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import PersonCard from "../../components/Cards/PersonCard";

const People = () => {
  const {
    data: { page, people },
    loading,
    setData,
    getPeople,
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
    getPeople(page);
  }, [page]);

  return (
    <div>
      <h1> People </h1>
      <div className="py-8 px-40 bg-gray-900">
        {people &&
          people.map((person, index) => (
            <PersonCard ref={lastElementRef} key={index} media={person} />
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

export default People;
