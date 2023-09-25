import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import './MoviesCardList.css'

import {
  MaxScreen,
  MediumScreen,
  SmallScreen,
  InitMoreMaxScreen,
  InitLessMaxScreen,
  InitMediumScreen,
  InitSmallScreen,
  StepMaxScreen,
  StepMediumScreen,
  StepSmallScreen
} from "../../utils/constants";

export default function MoviesCardList({
  movies,
  onDelete,
  addMovie,
  savedMovies,
  isLoading,
  serverError,
  firstEntrance
})
{
  const [count, setCount] = useState(printCards().init)
  const fact = movies.slice(0, count)
  const { pathname } = useLocation()

  function printCards() {
    const counter = { init: InitMoreMaxScreen, step: StepMaxScreen }
    if (window.innerWidth < MaxScreen) {
      counter.init = InitLessMaxScreen
      counter.step = StepMediumScreen
    }
    if (window.innerWidth < MediumScreen) {
      counter.init = InitMediumScreen
      counter.step = StepSmallScreen
    }
    if (window.innerWidth < SmallScreen) {
      counter.init = InitSmallScreen
      counter.step = StepSmallScreen
    }
    return counter
  }

  function clickMore() {
    setCount(count + printCards().step)
  }

  useEffect(() => {
    if (pathname === '/movies') {
      setCount(printCards().init)
      function printCardsForResize() {
        if (window.innerWidth >= StepMaxScreen) {
          setCount(printCards().init)
        }
        if (window.innerWidth < StepMaxScreen) {
          setCount(printCards().init)
        }
        if (window.innerWidth < MediumScreen) {
          setCount(printCards().init)
        }
        if (window.innerWidth < SmallScreen) {
          setCount(printCards().init)
        }
      }
      window.addEventListener('resize', printCardsForResize)
      return () => window.removeEventListener('resize', printCardsForResize)
    }
  }, [pathname, movies])

  return (
    <section className='gallery__main'>
      <ul className='gallery__ul'>
        {isLoading ? <Preloader />
          : (pathname === '/movies' && fact.length !== 0)
          ? fact.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  data={data}
                  addMovie={addMovie}
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
          ? <span className='gallery__error'>
              «Во время запроса произошла ошибка.
              Возможно, проблема с соединением или сервер недоступен.
              Подождите немного и попробуйте ещё раз»
            </span>
          : !firstEntrance
          ? <span className='gallery__error'>
              «Ничего не найдено»
            </span>
          : pathname === '/movies'
          ? <span className='gallery__error'>
              «Чтобы увидеть список фильмоа выполните поиск»
            </span>
          : <span className='gallery__error'>
              «Нет сохранённых фильмов»
            </span>
        }
      </ul>
      {pathname === '/movies'
        && <button
            type='button'
            className={`
              gallery__else
              ${count >= movies.length && 'gallery__else_hidden'
              }`
            }
            onClick={clickMore}
           >
            Ёще
           </button>}
    </section>
  )
}
