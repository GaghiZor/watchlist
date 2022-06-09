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
  GridItem,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import MovieCard from "../../components/Cards/MovieCard";
import TvCard from "../../components/Cards/TvCard";
import MediaGridSearch from "../../components/MediaGridSearch";

const Search = () => {
  const {
    searchData: {page, numOfPages, movies, series, people},
    loading,
    clearState,
    fetchSearchMovies,
    fetchSearchSeries,
    fetchSearchPeople,
  } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState(0);

  const fetchData = (dataType) => {
    if (searchQuery === "") {
      clearState();
      return;
    }
    switch (dataType) {
      case 0:
        fetchSearchMovies(searchQuery);
        break;
      case 1:
        fetchSearchSeries(searchQuery);
        break;
      case 2:
        fetchSearchPeople(searchQuery);
        break;
      default:
        fetchSearchMovies(searchQuery);
        break;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    if (searchQuery.length >= 2) {
      fetchData(type);
    }
  };

  const handleChange = (newValue) => {
    setType(newValue);
  };

  useEffect(() => {
    fetchData(type);
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
          width="100vw"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyUp={handleKeyPress}
        />
      <Button className="ml-2" onClick={handleClick}>Search</Button>
      </InputGroup>

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
                {!loading ? (
                  <MediaGridSearch>
                    {movies &&
                      movies.map((movie, index) => (
                        <GridItem key={index} w="100%">
                          <MovieCard key={movie.id} media={movie} />
                        </GridItem>
                      ))}
                  </MediaGridSearch>
                ) : (
                  <Button
                    isLoading={loading}
                    loadingText="Loading"
                    colorScheme="teal"
                    variant="outline"
                    spinnerPlacement="end"
                  />
                )}
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {type === 1 && (
              <div>
                {!loading ? (
                  <MediaGridSearch>
                    {series &&
                      series.map((tv, index) => (
                        <GridItem key={index} w="100%">
                          <TvCard key={tv.id} media={tv} />
                        </GridItem>
                      ))}
                  </MediaGridSearch>
                ) : (
                  <Button
                    isLoading={loading}
                    loadingText="Loading"
                    colorScheme="teal"
                    variant="outline"
                    spinnerPlacement="end"
                  />
                )}
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {type === 2 && (
              <div>
                {people &&
                  people.map((person) => (
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
