import {
  useCallback,
  useState,
  useEffect
} from "react";
import {
  DURATION_TIME,
  MOVIE_ITEM,
  ALL_MOVIE_ITEM,
  SHORT_MOVIE_ITEM
} from "../../utils/MovieConstants";
import { SEARCH_MOVIE_ERROR } from "../../utils/ErrorTexts";
import moviesApi from '../../utils/MoviesApi';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({
    setIsError,
    setNewMovie,
    savedMovies
  })
  {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [firstLog, setFirstLog] = useState(true);

  const filter = useCallback((
      search,
      isCheck,
      movies
    ) => {
      setSearchedMovie(search);
      localStorage.setItem(MOVIE_ITEM, JSON.stringify(search))
    localStorage.setItem(SHORT_MOVIE_ITEM, JSON.stringify(isCheck))
    localStorage.setItem(ALL_MOVIE_ITEM, JSON.stringify(movies))
      setFilteredMovies(movies.filter((movie) => {
        const searchName = movie
          .nameRU
          .toLowerCase()
          .includes(search.toLowerCase())
        return isCheck
          ? (searchName
              && movie.duration
              <= DURATION_TIME
            )
          : searchName
      }));
  }, []);

  function searchMovies(search) {
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi.takeMovies()
        .then((res) => {
          setAllMovies(res);
          setIsCheck(false);
          setServerError(false);
          setFirstLog(false);
          filter(
            search,
            isCheck,
            res
          );
        })
        .catch(err => {
          setServerError(true);
          console.error(`${SEARCH_MOVIE_ERROR} ${err}`);
        })
        .finally(() => setIsLoading(false));
    } else {
      filter(
        search,
        isCheck,
        allMovies
      );
    };
  };

  useEffect(() => {
    if (
        localStorage.allmovies
        && localStorage.shortMovies
        && localStorage.movie
        )
      {
        const movies = JSON.parse(localStorage.allmovies);
        const search = JSON.parse(localStorage.movie);
        const isCheck = JSON.parse(localStorage.shortMovies);
        setServerError(false);
        setFirstLog(false);
        setSearchedMovie(search);
        setIsCheck(isCheck);
        setAllMovies(movies);
        filter(
          search,
          isCheck,
          movies
        );
      }
  }, [filter]);

  function changeCLick() {
    if (isCheck) {
      setIsCheck(false);
      filter(
        searchedMovie,
        false,
        allMovies
      );
      localStorage.setItem(SHORT_MOVIE_ITEM, JSON.stringify(false));
    } else {
      setIsCheck(true);
      filter(
        searchedMovie,
        true,
        allMovies
      );
      localStorage.setItem(SHORT_MOVIE_ITEM, JSON.stringify(true));
    }
  };

  return (
    <>
      <SearchForm
        isCheck={isCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        changeFilter={changeCLick}
        setIsError={setIsError}
        firstLog={firstLog}
      />
      <MoviesCardList
        movies={filteredMovies}
        setNewMovie={setNewMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
        serverError={serverError}
        firstLog={firstLog}
      />
    </>
  );
};
