import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import './SectionLogin.css'

export default function SectionLogin({
  name,
  children,
  isValid,
  onSubmit,
  setIsError
})
{
  return (
    <section className='login__main'>
      <Link to={'/'} className="login__navigation-home" />
      <h2 className='login__title'>{name
        === 'signin'
        ? 'Рады видеть!'
        : 'Добро пожаловать!'
        }
      </h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onSubmit}
        setIsError={setIsError}
      >
        {children}
      </Form>
      {name === 'signin'
        ? <p className='login__text'>
          Ещё не зарегистрированы?
          <Link to={'/signup'} className='login__navigation'>
            Регистрация
            </Link>
          </p>
        : name === 'signup'
        ? <p className='login__text'>
            Уже зарегистрированы?
            <Link to={'/signin'} className='login__navigation'>
              Войти</Link>
          </p>
        : <Link to={'/'}>
            Выйти из аккаунта
          </Link>
      }
    </section>
  )
}
