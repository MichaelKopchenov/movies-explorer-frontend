import { Link } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { EmailRegex } from '../../utils/constants'
import Form from '../Form/Form'
import Input from '../Input/Input'
import useFormValidation from '../../hooks/useFormValidation'
import './Profile.css'

export default function Profile({
  name,
  logOut,
  editUserData,
  setIsError,
  isSuccess,
  setSuccess,
  setIsEdit,
  isEdit
})
{
  const {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    resetForm
  } = useFormValidation()

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    resetForm({username: currentUser.name, email: currentUser.email})
  }, [
      resetForm,
      isEdit,
      currentUser
     ])

  function onSubmit(evt) {
    evt.preventDefault()
    editUserData(values.username, values.email)
  }

  return (
    <section className="profile__main">
      <h2 className='profile__title'>
        {`Привет, ${currentUser.name}!`}
      </h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onSubmit}
        setIsError={setIsError}
        values={values}
        isSuccess={isSuccess}
        setSuccess={setSuccess}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
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
          isEdit={isEdit}
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
          pattern={EmailRegex}
          isEdit={isEdit}
        />
      </Form>
      <Link
        to={'/'}
        onClick={logOut}
        className='profile__exit'
      >
        Выйти из аккаунта
      </Link>
    </section>
  )
}
