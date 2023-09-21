import MoviesCard from '../MoviesCard/MoviesCard'
import { useState } from 'react'
import './MoviesCardList.css'

export default function MoviesCardList({ movies }) {
  const [count, setCount] = useState(printCards().init)
  const fact = movies.slice(0, count)

  function printCards() {
    const counter = { init: 16, step: 4}
    if (window.innerWidth < 1023) {
      counter.init = 8
      counter.step = 2
    }
    if (window.innerWidth < 650) {
      counter.init = 5
      counter.step = 2
    }
    return counter
  }

  function clickMore() {
    setCount(count + printCards().step)
  }

  return (
    <section className='gallery__main'>
      <ul className='gallery__ul'>
        {fact.map(data => {
          return (
            <MoviesCard
              key={data.id}
              name={data.name}
              src={data.image}
              duration={data.duration}
              trailerLink={data.trailerLink}
            />
          )
        })}
      </ul>
      <button
        type='button'
        className={`gallery__else ${count >= movies.length && 'gallery__else_hidden'}`}
        onClick={clickMore}>
          Ёще
      </button>
    </section>
  )
}