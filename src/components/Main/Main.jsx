import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error'
import Profile from '../Profile/Profile';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies, saveMovies } from '../../utils/constants'
import { useEffect, useState } from 'react';

export default function Main({ name, setLoggedIn }) {
  const [moviesAll, setMoviesAll] = useState([])
  const [saveMovie, setSaveMovie] = useState([])
  const [isCheckMoviesAll, setIsCheckMoviesAll] = useState(true)
  const [isCheckMoviesSave, setIsCheckMoviesSave] = useState(true)

  useEffect(() => {
    setMoviesAll(movies)
    setSaveMovie(saveMovies)
  }, [])

  function onCheckMoviesAll() {
    if (isCheckMoviesAll) {
      setIsCheckMoviesAll(false)
    } else {
      setIsCheckMoviesAll(true)
      setMoviesAll(movies)
    }
  }

  function onCheckMoviesSave() {
    if (isCheckMoviesSave) {
      setIsCheckMoviesSave(false)
    } else {
      setIsCheckMoviesSave(true)
      setSaveMovie(saveMovies)
    }
  }

  return (
    <main>
      {{
        home:
          <>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </>,
        signin: <Login name={name} setLoggedIn={setLoggedIn} />,
        signup: <Register name={name} setLoggedIn={setLoggedIn} />,
        error: <Error />,
        profile: <Profile name={name} setLoggedIn={setLoggedIn} />,
        movies:
          <>
            <SearchForm isCheck={isCheckMoviesAll} changeClick={onCheckMoviesAll} />
            <MoviesCardList movies={moviesAll} />
          </>,
        savedmovies:
          <>
            <SearchForm isCheck={isCheckMoviesSave} changeClick={onCheckMoviesSave} />
            <MoviesCardList movies={saveMovie} />
          </>
      }[name]}
    </main>
  )
}
