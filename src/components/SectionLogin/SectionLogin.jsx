import { Link } from 'react-router-dom';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE
} from '../../utils/RouteConstants';
import { WELCOME_LOGIN_TEXT, WECLOME_REGISTRATION_TEXT } from '../../utils/AuthorConstants';
import Form from '../Form/Form';
import './SectionLogin.css';

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
      <Link to={HOME_ROUTE} className="login__navigation-home" />
      <h2 className='login__title'>{name === 'signin'
        ? WELCOME_LOGIN_TEXT
        : WECLOME_REGISTRATION_TEXT
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
          <Link to={REGISTRATION_ROUTE} className='login__navigation'>
            Регистрация
          </Link>
          </p>
        : name === 'signup'
        ? <p className='login__text'>
            Уже зарегистрированы?
             <Link to={LOGIN_ROUTE} className='login__navigation'>
              Войти
             </Link>
          </p>
        : <Link to={HOME_ROUTE}>
            Выйти из аккаунта
          </Link>
      }
    </section>
  );
};
