import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MOVIES_ROUTE } from '../../utils/RouteConstants';
import {
  MAX_SCREEN,
  STANDART_SCREEN,
  SML_SCREEN,
  SIXTEEN_CARDS,
  TWELVE_CARDS,
  EIGHT_CARDS,
  FIVE_CARDS,
  FOUR_CARDS,
  THREE_CARDS,
  TWO_CARDS
} from "../../utils/MovieConstants";
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

export default function MoviesCardList({
  movies,
  onDelete,
  setNewMovie,
  savedMovies,
  isLoading,
  serverError,
  firstLog
})
{
  const [count, setCount] = useState(showCards().init);
  const fact = movies.slice(0, count);
  const { pathname } = useLocation();

  function showCards() {
    const counter = { init: SIXTEEN_CARDS, step: FOUR_CARDS }
    if (window.innerWidth < MAX_SCREEN) {
      counter.init = TWELVE_CARDS;
      counter.step = THREE_CARDS;
    }
    if (window.innerWidth < STANDART_SCREEN) {
      counter.init = EIGHT_CARDS;
      counter.step = TWO_CARDS;
    }
    if (window.innerWidth < SML_SCREEN) {
      counter.init = FIVE_CARDS;
      counter.step = TWO_CARDS;
    }
    return counter;
  };

  function clickMore() {
    setCount(count + showCards().step);
  };

  useEffect(() => {
    if (pathname === MOVIES_ROUTE) {
      setCount(showCards().init);
      function showCardsResize() {
        if (window.innerWidth >= FOUR_CARDS) {
          setCount(showCards().init);
        }
        if (window.innerWidth < FOUR_CARDS) {
          setCount(showCards().init);
        }
        if (window.innerWidth < STANDART_SCREEN) {
          setCount(showCards().init);
        }
        if (window.innerWidth < SML_SCREEN) {
          setCount(showCards().init);
        }
      };
      window.addEventListener('resize', showCardsResize);
      return () => window.removeEventListener('resize', showCardsResize);
    }
  }, [pathname, movies]);

  return (
    <section className='movies__main'>
      <ul className='movies__ul'>
        {isLoading
          ? <Preloader />
          : (pathname
              === MOVIES_ROUTE
              && fact.length !== 0)
          ? fact.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  data={data}
                  setNewMovie={setNewMovie}
                  savedMovies={savedMovies}
                />
              )
            })
          : movies.length !== 0
          ? movies.map(data => {
            return (
              <MoviesCard
                key={data._id}
                onDelete={onDelete}
                data={data}
              />
            )
          })
          : serverError
          ? <span className='movies__error'>
              «Во время запроса произошла ошибка.
              Возможно, проблема с соединением или сервер недоступен.
              Подождите немного и попробуйте ещё раз»
            </span>
          : !firstLog
          ? <span className='movies__error'>
              «Ничего не найдено»
            </span>
          : pathname
            === '/movies'
          ? <span className='movies__error'>
              «Чтобы увидеть список фильмоа выполните поиск»
            </span>
          : <span className='movies__error'>
              «Нет сохранённых фильмов»
            </span>
        }
      </ul>
      {pathname
        === MOVIES_ROUTE
        && <button
            type='button'
            onClick={clickMore}
            className={`
              movies__else
              ${count
                >= movies.length
                && 'movies__else_hidden'
              }`
            }
           >
            Ёще
           </button>}
    </section>
  );
};
