import {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Route,
  Routes,
  Navigate,
  useNavigate
} from 'react-router-dom';
import {
  DATA_OF_USER_ERROR,
  REGISTRATION_ERROR,
  LOGIN_ERROR,
  PUT_LIKE_ERROR,
  NEW_DATA_OF_USER_ERROR,
  DELETE_MOVIE_ERROR
} from '../../utils/ErrorTexts';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  MOVIES_ROUTE,
  PROFILE_ROUTE,
  HOME_ROUTE,
  FAVORITE_MOVIES_ROUTE,
  ERROR_ROUTE
} from '../../utils/RouteConstants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SendContext from '../../contexts/SendContext';
import ErrorContext from '../../contexts/ErrorContext'
import ProtectedRoute from '../Protected/ProtectedRoute';
import ProtectedProject from '../Protected/ProtectedProject'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import './App.css';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isCheckToken, setIsTokenCheck] = useState(true);
  const [isOk, setIsOk] = useState(false);
  const [isTransform, setIsTransform] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.jwt;

  useEffect(() => {
    if (token) {
      Promise.all([mainApi.dataOfUser(token), mainApi.dataOfMovies(token)])
        .then(([dataOfUser, dataOfMovies]) => {
          setSavedMovies(dataOfMovies.reverse());
          setCurrentUser(dataOfUser);
          setLoggedIn(true);
          setIsTokenCheck(false);
        })
        .catch((err) => {
          console.error(`${DATA_OF_USER_ERROR} ${err}`);
          setIsTokenCheck(false);
          localStorage.clear();
        })
    } else {
      setLoggedIn(false);
      setIsTokenCheck(false);
      localStorage.clear();
    }
  }, [loggedIn, token]);

  const setOk = useCallback(() => {
    setIsOk(false);
  }, []);

  function handleRegister(
    username,
    email,
    password
    )
  {
    setIsSend(true);
    mainApi.register(
      username,
      email,
      password
    )
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`${REGISTRATION_ERROR} ${err}`);
      })
      .finally(() => setIsSend(false));
  };

  function handleLogin(email, password) {
    setIsSend(true);
    mainApi.login(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate({MOVIES_ROUTE});
      })
      .catch((err) => {
        setIsError(true);
        console.error(`${LOGIN_ERROR} ${err}`);
      })
      .finally(() => setIsSend(false));
  };

  function logOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate({HOME_ROUTE});
  };

  function handleShortMovie(data) {
    const isAdd = savedMovies.some(element => data.id === element.movieId);
    const searchClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isAdd) {
      deleteMyMovie(searchClickMovie[0]._id);
    } else {
      mainApi.setNewMovie(data, token)
        .then(res => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((err) => console.error(`${PUT_LIKE_ERROR} ${err}`));
    }
  };

  function deleteMyMovie(deletemovieId) {
    mainApi.deleteMovie(deletemovieId, token)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }));
      })
      .catch((err) => console.error(`${DELETE_MOVIE_ERROR} ${err}`));
  };

  function editUserData(username, email) {
    setIsSend(true);
    mainApi.setNewDataOfUser(
      username,
      email,
      token
    )
      .then(res => {
        setCurrentUser(res);
        setIsOk(true);
        setIsTransform(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`${NEW_DATA_OF_USER_ERROR} ${err}`);
      })
      .finally(() => setIsSend(false))
  };

  return (
    <div className="page__container">
      {isCheckToken
        ? <Preloader />
        : <CurrentUserContext.Provider value={currentUser}>
            <SendContext.Provider value={isSend}>
              <ErrorContext.Provider value={isError}>
                <Routes>
                  <Route path={LOGIN_ROUTE} element={
                    loggedIn
                    ? <Navigate to={MOVIES_ROUTE} replace />
                    : <Main
                        name='signin'
                        onLogin={handleLogin}
                        setIsError={setIsError}
                      />
                    }
                  />
                  <Route path={REGISTRATION_ROUTE} element={
                    loggedIn
                      ? <Navigate to={MOVIES_ROUTE} replace />
                      : <Main
                          name='signup'
                          onRegister={handleRegister}
                          setIsError={setIsError}
                        />
                      }
                  />
                  <Route path={PROFILE_ROUTE} element={
                    <ProtectedRoute
                      element={ProtectedProject}
                      name='profile'
                      loggedIn={loggedIn}
                      logOut={logOut}
                      onUpdateUser={editUserData}
                      setIsError={setIsError}
                      isOk={isOk}
                      setOk={setOk}
                      setIsTransform={setIsTransform}
                      isTransform={isTransform}
                    />
                    }
                  />
                  <Route path={HOME_ROUTE} element={
                    <>
                      <Header name='home' loggedIn={loggedIn} />
                      <Main name='home' />
                      <Footer />
                    </>
                    }
                  />
                  <Route path={MOVIES_ROUTE} element={
                    <ProtectedRoute
                      element={ProtectedProject}
                      name='movies'
                      savedMovies={savedMovies}
                      setNewMovie={handleShortMovie}
                      loggedIn={loggedIn}
                      setIsError={setIsError}
                    />
                    }
                  />
                  <Route path={FAVORITE_MOVIES_ROUTE} element={
                    <ProtectedRoute
                      element={ProtectedProject}
                      name='savedmovies'
                      onDelete={deleteMyMovie}
                      savedMovies={savedMovies}
                      loggedIn={loggedIn}
                      setIsError={setIsError}
                    />
                    }
                  />
                  <Route path={ERROR_ROUTE} element={
                    <>
                      <Main name='error' />
                    </>
                    }
                  />
                </Routes>
              </ErrorContext.Provider>
            </SendContext.Provider>
          </CurrentUserContext.Provider>
        }
    </div>
  );
};

export default App;
