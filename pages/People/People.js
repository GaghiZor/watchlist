import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import MediaCard from "../../components/MediaCard";

const People = () => {
    const {
        data: { page, people },
        getPeople,
      } = useContext(AppContext);
    
      useEffect(() => {
        getPeople(page);
      }, [page]);
    return (
        <div>
      <h1> People </h1>
      <div className="py-8 px-40 bg-gray-900">
        {people &&
          people.map((person) => (
            <MediaCard key={person.id} media={person} />
          ))}
      </div>
    </div>
    )
}

export default People
