import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import ErrorContext from '../../contexts/ErrorContext'
import useFormValidation from '../../hooks/useFormValidation'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

export default function SearchForm({
  isCheck,
  changeClick,
  searchedMovie,
  searchMovies,
  setIsError,
  firstEntrance,
  savedMovie
})
{
  const isError = useContext(ErrorContext)
  const { pathname } = useLocation()
  const {
    values,
    handleChange,
    resetForm
  } = useFormValidation()

  function onSubmit(evt) {
    evt.preventDefault()
    if (evt
        .target
        .search
        .value
        )
        {
          searchMovies(evt.target.search.value)
          setIsError(false)
        } else
        {
          setIsError(true)
        }
  }

  useEffect(() => {
    if ((pathname
        === '/saved-movies'
        && savedMovie.length
        === 0
        ))
      {
        resetForm({ search: '' })
      } else {
        resetForm({ search: searchedMovie })
      }
      setIsError(false)
    }, [
        searchedMovie,
        resetForm,
        setIsError,
        pathname,
        savedMovie
      ])

  return (
    <section className='search__main'>
      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name={'SearchForm'}
          onSubmit={onSubmit}
        >
          <input
            type="text"
            placeholder='Фильм'
            className='search__input'
            required
            value={values.search || ''}
            onChange={(evt) => {
              handleChange(evt)
              setIsError(false)
            }}
            disabled={
              savedMovie
              ? (savedMovie.length === 0 && true)
              : false
            }
          />
          <button
            type='submit'
            className={`
              search__submit
              ${savedMovie
              ? (pathname
                  === '/saved-movies'
                  && savedMovie.length
                  === 0
                )
              && 'search__submit_disabled'
              : ''
              }`
            }
          />
        </form>
        <span className={`
          search__error
          ${isError && 'search__error_active'}
          `}
        >
          {'Введите ключевое слово'}
        </span>
        <FilterCheckbox
          isCheck={isCheck}
          changeClick={changeClick}
          firstEntrance={firstEntrance}
        />
      </div>
    </section>
  )
}
