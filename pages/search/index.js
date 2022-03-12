import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { Constant } from "../../Constant";

const Search = () => {
  const {
    data: {},
    clearState,
  } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [people, setPeople] = useState([]);

  const fetchSearch = async () => {
    if (!searchQuery) {
      clearState();
      return;
    }

    try {
      if (type === 0) {
        await axios
          .get(
            `${Constant.DB_ENDPOINT}/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&query=${searchQuery}&page=${page}`
          )
          .then((response) => {
            const apiResponse = response.data;
            setMovies(apiResponse.results);
            setNumOfPages(apiResponse.total_pages);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (type === 1) {
        await axios
          .get(
            `${Constant.DB_ENDPOINT}/search/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&query=${searchQuery}&page=${page}`
          )
          .then((response) => {
            const apiResponse = response.data;
            setSeries(apiResponse.results);
            setNumOfPages(apiResponse.total_pages);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (type === 2) {
        await axios
          .get(
            `${Constant.DB_ENDPOINT}/search/person?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&query=${searchQuery}&page=${page}`
          )
          .then((response) => {
            const apiResponse = response.data;
            setPeople(apiResponse.results);
            setNumOfPages(apiResponse.total_pages);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    if (searchQuery.length > 3) {
      fetchSearch();
    }
  };

  const handleChange = (newValue) => {
    setType(newValue);
  };

  useEffect(() => {
    fetchSearch();
    //console.log(type);
  }, [type]);

  return (
    <>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          size="md"
          width="80vw"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyUp={handleKeyPress}
        />
      </InputGroup>
      <button onClick={handleClick}>Search</button>

      <Tabs
        isFitted
        variant="enclosed"
        margin={"1.5"}
        onChange={(index) => handleChange(index)}
      >
        <TabList mb="1em">
          <Tab tabIndex={0}>Movies</Tab>
          <Tab tabIndex={1}>Series</Tab>
          <Tab tabIndex={2}>People</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {type === 0 && (
              <div>
                {movies.map((movie) => (
                  <div key={movie.id}>
                    <Link href={`/movies/${movie.id}`}>
                      <a>{movie.title}</a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {type === 1 && (
              <div>
                {series.map((tv) => (
                  <div key={tv.id}>
                    <Link href={`/tv/${tv.id}`}>
                      <a>{tv.name}</a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {type === 2 && (
              <div>
                {people.map((person) => (
                  <div key={person.id}>
                    <Link href={`/people/${person.id}`}>
                      <a>{person.name}</a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Search;
