import { useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { FAVORITE_MOVIES_ROUTE } from '../../utils/RouteConstants';
import { INPUT_MOVIE_TEXT_ERROR } from '../../utils/ErrorTexts';
import { PLACEHOLDER_SEARCH_TEXT } from '../../utils/PlaceholderConstants';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import ErrorContext from '../../contexts/ErrorContext';
import useFormValidation from '../../hooks/useFormValidation';
import './SearchForm.css';

export default function SearchForm({
  isCheck,
  changeFilter,
  searchedMovie,
  searchMovies,
  setIsError,
  firstLog,
  savedMovie
})
{
  const { pathname } = useLocation();
  const isError = useContext(ErrorContext);
  const {
    values,
    handleChange,
    resetForm
  } = useFormValidation();

  useEffect(() => {
    if ((pathname
        === FAVORITE_MOVIES_ROUTE
        && savedMovie.length
        === 0
        )
      )
    {
      resetForm({ search: '' });
    } else {
      resetForm({ search: searchedMovie });
    }
    setIsError(false);
  }, [
      searchedMovie,
      resetForm,
      setIsError,
      pathname,
      savedMovie
    ]
);

  function onSubmit(evt) {
    evt.preventDefault();
    if (evt
        .target
        .search
        .value
      )
    {
      searchMovies(evt
        .target
        .search
        .value
      );
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

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
            required
            type="text"
            name='search'
            placeholder={PLACEHOLDER_SEARCH_TEXT}
            className='search__input'
            value={values.search || ''}
            onChange={(evt) => {
              handleChange(evt);
              setIsError(false);
            }}
            disabled={savedMovie
              ? (savedMovie.length
                  === 0
                  && true
                )
              : false
            }
          />
          <button type='submit' className={`
            search__submit
            ${savedMovie
              ? (pathname
                === FAVORITE_MOVIES_ROUTE
                && savedMovie.length
                === 0
                )
              && 'search__submit_disabled'
              : ''
            }`
          }
          />
        </form>
        <span className={`search__error ${isError && 'search__error_active'}`}>
          {INPUT_MOVIE_TEXT_ERROR}
        </span>
        <FilterCheckbox
          isCheck={isCheck}
          changeFilter={changeFilter}
          firstLog={firstLog}
        />
      </div>
    </section>
  );
};
