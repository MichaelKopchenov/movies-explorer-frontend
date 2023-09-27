import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../utils/RouteConstants';
import {
  TEXT_LOGIN_ERROR,
  TEXT_REGISTRATION_ERROR,
  TEXT_UPDATE_USER_INFO_ERROR,
 } from '../../utils/ErrorTexts';
import {
  ENTER_BUTTON_TEXT,
  SIGNUP_BUTTON_TEXT,
  UPGRADE_BUTTON_TEXT,
  SAVE_BUTTON_TEXT,
  CANCEL_UPGRADE_BUTTON_TEXT
} from '../../utils/ProfileConstants';
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SendContext from '../../contexts/SendContext';
import ErrorContext from '../../contexts/ErrorContext';
import './Form.css';

export default function Form({
  name,
  children,
  isValid,
  onSubmit,
  setIsError,
  values,
  setOk,
  setIsTransform,
  isTransform
})
{
  const { pathname } = useLocation();
  const isError = useContext(ErrorContext);
  const isSend = useContext(SendContext);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setIsError(false);
  }, [setIsError, values]);

  useEffect(() => {
    if (pathname === PROFILE_ROUTE) {
      setOk(false);
      setIsTransform(false);
    }
  }, [
    setOk,
    setIsTransform,
    pathname
  ]
  );

  return (
    <form
      noValidate
      name={name}
      onSubmit={onSubmit}
    >
      {children}
      {
        name === 'signin'
        ? <>
            <span className={`login__error-auth ${isError && 'login__error-active'}`}>
              {TEXT_LOGIN_ERROR}
            </span>
            <button
              type="submit"
              className={`login__submit ${isValid && !isError
                ? ''
                : 'login__submit_disabled'}`
              }
              disabled={
                !isValid
                || isSend
                || isError
              }
            >
              {isSend
                ? <Preloader name='btn' />
                : ENTER_BUTTON_TEXT
              }
            </button>
          </>
        : name === 'signup'
        ? <>
            <span className={`
              login__error-auth
              login__error-auth_type_reg
              ${isError && 'login__error-active'}`
            }
            >
              {TEXT_REGISTRATION_ERROR}
            </span>
            <button
              type="submit"
              className={`login__submit ${isValid && !isError
                ? ''
                : 'login__submit_disabled'}`
              }
              disabled={
                !isValid
                || isSend
                || isError
              }
            >
              {isSend
                ? <Preloader name='btn' />
                : SIGNUP_BUTTON_TEXT
              }
            </button>
          </>
        : !isTransform
        ? <>
            <span className={`profile__error-auth ${isError
              ? 'profile__error-auth_type_err'
              : ''}`
              }
            >
              {isError
                ? TEXT_UPDATE_USER_INFO_ERROR
                : ''
              }
            </span>
            <button
              type="button"
              className={`profile__submit`}
              onClick={() => {
                setIsTransform(true);
                setOk(false);
              }}
            >
              {UPGRADE_BUTTON_TEXT}
            </button>
          </>
        : <>
            <span className={`profile__error-auth ${isError
              ? 'profile__error-auth_type_err'
              : ''}`
              }
            >
              {isError
                ? TEXT_UPDATE_USER_INFO_ERROR
                : ''
              }
            </span>
            <button
              type="submit"
              className={`login__submit ${(values.username
                === currentUser.name
                && values.email
                === currentUser.email
                )
                || !isValid
                || isError
                ? 'login__submit_disabled'
                : ''}`
              }
              disabled={
                !isValid
                || isSend
                || isError
              }
            >
              {isSend
                ? <Preloader name='btn' />
                : SAVE_BUTTON_TEXT
              }
            </button>
            <button
              type="button"
              className={`profile__submit`}
              onClick={() => {
                setIsTransform(false);
                setOk(false);
                setIsError(false);
              }}
            >
              {CANCEL_UPGRADE_BUTTON_TEXT}
            </button>
          </>
      }
    </form>
  );
};
