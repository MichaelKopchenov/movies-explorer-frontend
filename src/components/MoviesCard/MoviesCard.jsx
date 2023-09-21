import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import './MoviesCard.css'

export default function MoviesCard({
    name,
    src,
    duration,
    trailerLink
  })
  {
    const { pathname } = useLocation()
    const [click, setClick] = useState(false)

    function onClick() {
      if (click) {
        setClick(false)
      } else {
        setClick(true)
      }
    }
    return (
      <li className='gallery__card'>
        <article>
          <a
          href={trailerLink}
          target='_blank'
          rel="noreferrer"
          >
            <img
              src={src}
              alt="#"
              className='gallery__picture'
            />
          </a>
          <div className='gallery__card-group'>
            <div className='gallery__text-group'>
              <p className='gallery__subtitle'>{name}</p>
              <span className='gallery__duration'>{duration}</span>
            </div>
            {pathname === '/movies' ?
              <button
                type='button'
                className={`gallery__save ${click ? 'gallery__save_active' : ''}`}
                onClick={onClick}
              />
              :
              <button
                type='button'
                className={`gallery__save gallery__save_type_delete`}
                onClick={onClick}
              />
            }
          </div>
        </article>
      </li>
    )
}
