import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MOVIES_ROUTE } from '../../utils/RouteConstants';
import './MoviesCard.css';

export default function MoviesCard({
  data,
  setNewMovie,
  savedMovies,
  onDelete
})
{
  const { pathname } = useLocation();
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (pathname === MOVIES_ROUTE)
      setClick(savedMovies.some(element => data.id === element.movieId));
  }, [savedMovies,
      data.id,
      setClick,
      pathname]
  );

  function onClick() {
    if (savedMovies.some(element => data.id === element.movieId)) {
      setClick(true);
      setNewMovie(data);
    } else {
      setClick(false);
      setNewMovie(data);
    }
  };

  function durationTime(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return (hours
      === 0
      ? `${minutes}м`
      : minutes === 0
      ? `${hours}ч`
      : `${hours}ч${minutes}м`
    );
  };

  return (
    <li className='movies__card'>
      <article>
        <a
        href={data.trailerLink}
        target='_blank'
        rel="noreferrer"
        >
          <img
            alt={data.name}
            className='movies__album'
            src={pathname
              === '/movies'
              ? `https://api.nomoreparties.co${data.image.url}`
              : data.image
            }
          />
        </a>
        <div className='movies__card-ul'>
          <div className='movies__text-ul'>
            <p className='movies__subtitle'>
              {data.nameRU}
            </p>
            <span className='movies__duration'>
              {durationTime(data.duration)}
            </span>
          </div>
          {pathname
            === '/movies'
            ? <button
                type='button'
                onClick={onClick}
                className={`
                  movies__save
                  ${click
                    ? 'movies__save_active'
                    : ''
                  }`
                }
              />
            : <button
                type='button'
                className={`movies__save movies__save_type_delete`}
                onClick={() => onDelete(data._id)}
              />
          }
        </div>
      </article>
    </li>
  );
};
