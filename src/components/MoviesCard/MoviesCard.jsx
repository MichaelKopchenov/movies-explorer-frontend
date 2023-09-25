import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './MoviesCard.css'

export default function MoviesCard({
    data,
    addMovie,
    savedMovies,
    onDelete
  })
  {
    const { pathname } = useLocation()
    const [click, setClick] = useState(false)

    useEffect(() => {
      if (pathname === '/movies')
        setClick(savedMovies.some(element => data.id === element.movieId))
    }, [
        savedMovies,
        data.id,
        setClick,
        pathname
      ]
    )

    function onClick() {
      if (savedMovies.some(element => data.id === element.movieId)) {
        setClick(true)
        addMovie(data)
      } else {
        setClick(false)
        addMovie(data)
      }
    }

    function durationTime(duration) {
      const minutes = duration % 60;
      const hours = Math.floor(duration / 60);
      return (hours === 0
        ? `${minutes}м`
        : minutes === 0
        ? `${hours}ч`
        : `${hours}ч${minutes}м`
      )
    }

    return (
      <li className='gallery__card'>
        <article>
          <a
          href={data.trailerLink}
          target='_blank'
          rel="noreferrer"
          >
            <img
              src={pathname === '/movies'
                ? `https://api.nomoreparties.co${data.image.url}`
                : data.image
              }
              alt={data.name}
              className='gallery__picture'
            />
          </a>
          <div className='gallery__card-group'>
            <div className='gallery__text-group'>
              <p className='gallery__subtitle'>
                {data.nameRU}
              </p>
              <span className='gallery__duration'>
                {durationTime(data.duration)}
              </span>
            </div>
            {pathname === '/movies' ?
              <button
                type='button'
                className={`
                  gallery__save
                  ${click
                    ? 'gallery__save_active'
                    : ''
                  }`
                }
                onClick={onClick}
              />
              :
              <button
                type='button'
                className={`gallery__save gallery__save_type_delete`}
                onClick={() => onDelete(data._id)}
              />
            }
          </div>
        </article>
      </li>
    )
}
