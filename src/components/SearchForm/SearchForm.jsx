import { useState } from 'react'
import useFormValidation from '../../hooks/useFormValidation'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

export default function SearchForm({ isCheck, changeClick }) {
  const [isError,setIsError] = useState(false)
  const {
    values,
    isValid,
    handleChange
  } = useFormValidation()

  function onSubmit(evt) {
    evt.preventDefault()
    if (!isValid) {
      setIsError(true)
      return
    } else {
      setIsError(false)
    }
  }

  return (
    <section className='search__main'>
      <div className='search__container'>
        <form
          noValidate
          className='search__form'
          name={'SearchForm'}
          value={values.search}
          onSubmit={onSubmit}
        >
          <input
            type="text"
            placeholder='Фильм'
            className='search__input'
            required
            onChange={handleChange}
          />
          <button className='search_submit' />
        </form>
        <span className={`search__error ${isError && 'search__error_active'}`}>{isError ? 'Начните ввод фильма' : ''}</span>
        <FilterCheckbox isCheck={isCheck} changeClick={changeClick}/>
      </div>
    </section>
  )
}
