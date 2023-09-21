import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Form from '../Form/Form'
import Input from '../Input/Input'
import useFormValidation from '../../hooks/useFormValidation'
import './Profile.css'

export default function Profile({ name, setLoggedIn }) {
  const {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    resetForm
  } = useFormValidation()

  useEffect(() => {
    resetForm({username: 'Михаил', email: 'michaelkopchenov@yandex.ru'})
  }, [resetForm])

  function onEdit(evt) {
    evt.preventDefault()
  }

  function outLogin() {
    setLoggedIn(false)
  }
  return (
    <section className="profile__main">
      <h2 className='profile__title'>{`Привет, Михаил!`}</h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onEdit}
      >
        <Input
          selectname={name}
          name='username'
          type='text'
          title='Имя'
          minLength='3'
          value={values.username}
          isInputValid={isInputValid.username}
          error={errors.username}
          onChange={handleChange}
        />
        <Input
          selectname={name}
          name='email'
          type='email'
          title='E-mail'
          value={values.email}
          isInputValid={isInputValid.email}
          error={errors.email}
          onChange={handleChange}
        />
      </Form>
      <Link
        to={'/'}
        onClick={outLogin}
        className='profile__exit'
      >
          Выйти из аккаунта
      </Link>
    </section>
  )
}
