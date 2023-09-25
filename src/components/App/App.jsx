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
import './App.css'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useState([])
  const [isError, setIsError] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const navigate = useNavigate()

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      Promise.all([mainApi.dataOfUser(), mainApi.getMovies()])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse())
          setCurrentUser(userData)
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`)
          setIsCheckToken(false)
        })
    } else {
      setLoggedIn(false)
      setIsCheckToken(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  const setSuccess = useCallback(() => {
    setIsSuccess(false)
  }, [])

  function handleRegister(
    username,
    email,
    password
    )
  {
    setIsSend(true)
    mainApi.register(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          mainApi.login(email, password)
            .then(res => {
              localStorage.setItem('jwt', res.token)
              setLoggedIn(true)
              navigate('/movies')
              window.scrollTo(0, 0)
            })
            .catch((err) => {
              setIsError(true)
              console.error(`Ошибкак при авторизации после регистрации ${err}`)
            })
            .finally(() => setIsSend(false))
        }
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибкак при регистрации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleLogin(email, password) {
    setIsSend(true)
    mainApi.login(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/movies')
        window.scrollTo(0, 0)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибкак при авторизации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function logOut() {
    token.clear()
    setLoggedIn(false)
    navigate('/')
  }

  function handleToggelMovie(data) {
    const isAdd = savedMovies.some(element => data.id === element.movieId)
    const seachClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isAdd) {
      deleteMovie(seachClickMovie[0]._id)
    } else {
      mainApi.setNewMovie(data)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }

  function deleteMovie(deletemovieId) {
    mainApi.deleteMyMovie(deletemovieId)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }

  function editUserData(username, email) {
    setIsSend(true)
    mainApi.setNewProfileData(username, email)
      .then(res => {
        setCurrentUser(res)
        setIsSuccess(true)
        setIsEdit(false)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибкак при редактировании данных пользователя ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  return (
    <div className="page__container">
      {isCheckToken ? <Preloader /> :
        <CurrentUserContext.Provider value={currentUser}>
          <SendContext.Provider value={isSend}>
            <ErrorContext.Provider value={isError}>
              <Routes>
                <Route path='/signin' element={
                  loggedIn
                  ? <Navigate to='/movies' replace />
                  : <Main
                      name='signin'
                      onLogin={handleLogin}
                      setIsError={setIsError}
                    />
                  }
                />
                <Route path='/signup' element={
                  loggedIn
                  ? <Navigate to='/movies' replace />
                  : <Main
                      name='signup'
                      onRegister={handleRegister}
                      setIsError={setIsError}
                    />
                  }
                />
                <Route path='/profile' element={
                  <ProtectedRoute
                    element={ProtectedProject}
                    name='profile'
                    loggedIn={loggedIn}
                    logOut={logOut}
                    editUserData={editUserData}
                    setIsError={setIsError}
                    isSuccess={isSuccess}
                    setSuccess={setSuccess}
                    setIsEdit={setIsEdit}
                    isEdit={isEdit}
                  />
                  }
                />
                <Route path='/' element={
                  <>
                    <Header name='home' loggedIn={loggedIn} />
                    <Main name='home' />
                    <Footer />
                  </>
                  }
                />
                <Route path='/movies' element={
                  <ProtectedRoute
                    element={ProtectedProject}
                    name='movies'
                    savedMovies={savedMovies}
                    addMovie={handleToggelMovie}
                    loggedIn={loggedIn}
                    setIsError={setIsError}
                  />
                  }
                />
                <Route path='/saved-movies' element={
                  <ProtectedRoute
                    element={ProtectedProject}
                    name='savedmovies'
                    onDelete={deleteMovie}
                    savedMovies={savedMovies}
                    loggedIn={loggedIn}
                    setIsError={setIsError}
                  />
                  }
                />
                <Route path='*' element={
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
}

export default App;
