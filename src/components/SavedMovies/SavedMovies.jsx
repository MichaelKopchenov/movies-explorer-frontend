import {
  useCallback,
  useEffect,
  useState
} from "react";
import { DURATION_TIME } from "../../utils/MovieConstants";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies({
  savedMovie,
  onDelete,
  setIsError
})
{
  const [filteredMovies, setFilteredMovies] = useState(savedMovie);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [firstLog, setFirstLog] = useState(true);

  const filter = useCallback((
    search,
    isCheck,
    movies
    ) =>
    {
      setSearchedMovie(search);
      setFilteredMovies(movies.filter((movie) => {
        const searchName = movie
          .nameRU
          .toLowerCase()
          .includes(search.toLowerCase());
        return isCheck
          ? (searchName
              && movie.duration
              <= DURATION_TIME
            )
          : searchName
      }
      )
      );
  }, []);

  function searchMovies(search) {
    setFirstLog(false);
    filter(
      search,
      isCheck,
      savedMovie
    );
  }

  useEffect(() => {
    if (savedMovie.length === 0) {
      setFirstLog(true);
    } else {
      setFirstLog(false);
    }
    filter(
      searchedMovie,
      isCheck,
      savedMovie
    );
  }, [
      filter,
      savedMovie,
      isCheck,
      searchedMovie
    ]);

  function changeFilter() {
    if (isCheck) {
      setIsCheck(false);
      setFirstLog(false);
      filter(
        searchedMovie,
        false,
        savedMovie
      );
    } else {
      setIsCheck(true);
      setFirstLog(false);
      filter(
        searchedMovie,
        true,
        savedMovie
      );
    }
  };

  return (
    <>
      <SearchForm
        isCheck={isCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        changeFilter={changeFilter}
        setIsError={setIsError}
        firstLog={firstLog}
        savedMovie={savedMovie}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        firstLog={firstLog}
      />
    </>
  );
};
