import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { EMAIL_REG } from '../../utils/AuthorConstants';
import { HOME_ROUTE } from '../../utils/RouteConstants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useFormValidation from '../../hooks/useFormValidation';
import './Profile.css';

export default function Profile({
  name,
  logOut,
  onUpdateUser,
  setIsError,
  isOk,
  setOk,
  setIsTransform,
  isTransform
})
{
  const {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    resetForm
  } = useFormValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm({username: currentUser.name, email: currentUser.email});
  }, [
      resetForm,
      isTransform,
      currentUser
     ]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values.username, values.email);
  };

  return (
    <section className="profile__main">
      <h2 className='profile__title'>
        {`Привет, ${currentUser.name}!`}
      </h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={handleSubmit}
        setIsError={setIsError}
        values={values}
        isOk={isOk}
        setOk={setOk}
        setIsTransform={setIsTransform}
        isTransform={isTransform}
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
          isTransform={isTransform}
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
          pattern={EMAIL_REG}
          isTransform={isTransform}
        />
      </Form>
      <Link
        to={HOME_ROUTE}
        onClick={logOut}
        className='profile__exit'
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
};
