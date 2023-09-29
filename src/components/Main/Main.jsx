import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error'
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

export default function Main({
  name,
  onRegister,
  onLogin,
  logOut,
  onUpdateUser,
  setIsError,
  savedMovies,
  onDelete,
  setNewMovie,
  isOk,
  setOk,
  setIsTransform,
  isTransform
})
{
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
        signin: <Login
          name={name}
          onLogin={onLogin}
          setIsError={setIsError}
        />,
        signup: <Register
          name={name}
          onRegister={onRegister}
          setIsError={setIsError}
        />,
        error: <Error />,
        profile: <Profile
          name={name}
          logOut={logOut}
          onUpdateUser={onUpdateUser}
          setIsError={setIsError}
          isOk={isOk}
          setOk={setOk}
          setIsTransform={setIsTransform}
          isTransform={isTransform}
        />,
        movies:
          <>
            <Movies
              savedMovies={savedMovies}
              setNewMovie={setNewMovie}
              setIsError={setIsError}
            />
          </>,
        savedmovies:
          <>
            <SavedMovies
              savedMovie={savedMovies}
              onDelete={onDelete}
              setIsError={setIsError}
            />
          </>
      }
        [name]
      }
    </main>
  );
};
