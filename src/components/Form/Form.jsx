import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Preloader from '../Preloader/Preloader'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import SendContext from '../../contexts/SendContext'
import ErrorContext from '../../contexts/ErrorContext'
import './Form.css'

export default function Form({
  name,
  children,
  isValid,
  onSubmit,
  setIsError,
  values,
  isSuccess,
  setSuccess,
  setIsEdit,
  isEdit
})
{
  const { pathname } = useLocation()
  const isError = useContext(ErrorContext)
  const isSend = useContext(SendContext)
  const currentUser = useContext(CurrentUserContext)

  // useEffect(() => {
  //   setIsError(true)
  // }, [setIsError, values])

  useEffect(() => {
    if (pathname === '/profile') {
      setSuccess(false)
      setIsEdit(false)
    }
  }, [
      setSuccess,
      setIsEdit,
      pathname
    ])

  return (
    <form
      noValidate
      name={name}
      onSubmit={onSubmit}
    >
      {children}
      {name
        === 'signin'
        ? <>
          <span className={`login__error-auth ${isError && 'login__error-active'}`}>
            {'При входе произошла ошибка.'}
          </span>
          <button
            type="submit"
            className={`
              login__submit
              ${isValid && !isError
                ? ''
                : 'login__submit_disabled'
              }
            `}
            disabled={
              !isValid
              || isSend
              || isError
            }
          >
            {
              isSend
              ? <Preloader name='btn' />
              : 'Войти'
            }
          </button>
        </>
        :
        name
          === 'signup'
          ? <>
            <span className={`
              login__error-auth
              login__error-auth_type_reg
              ${isError && 'login__error-active'}
            `}
            >
              {'При регистрации произошла ошибка.'}
            </span>
            <button
              type="submit"
              className={`
                login__submit
                ${isValid && !isError
                  ? ''
                  : 'login__submit_disabled'
                }
              `}
              disabled={
                !isValid
                || isSend
                || isError
              }
            >
              {isSend
                ? <Preloader name='btn' />
                : 'Зарегистрироваться'
              }
            </button>
          </>
          : !isEdit
          ? <>
              <span className={`
                profile__error-auth
                ${isError
                  ? 'profile__error-auth_type_err'
                  : isSuccess && 'profile__error-auth_type_ok'
                }
              `}
              >
                {isError
                  ? 'При обновлении профиля произошла ошибка.'
                  : 'Успешно'
                }
              </span>
              <button
                type="button"
                className={`profile__submit `}
                onClick={() => {
                  setIsEdit(true)
                  setSuccess(false)
                }}
              >
                {'Редактировать'}
              </button>
            </> :
            <>
              <span className={`
                profile__error-auth
                ${isError
                  ? 'profile__error-auth_type_err'
                  : isSuccess && 'profile__error-auth_type_ok'
                }
              `}
              >
                {isError
                  ? 'При обновлении профиля произошла ошибка.'
                  : 'Успешно'
                }
              </span>
              <button
                type="submit"
                className={`
                  login__submit
                  ${(values.username
                      === currentUser.name
                      && values.email
                      === currentUser.email
                    )
                    || !isValid
                    || isError
                    ? 'login__submit_disabled'
                    : ''
                  }
                `}
                disabled={
                  !isValid
                  || isSend
                  || isError
                }
              >
                {isSend
                  ? <Preloader name='button' />
                  : 'Сохранить'
                }
              </button>
              <button
                type="button"
                className={`profile__submit `}
                onClick={() => {
                  setIsEdit(false)
                  setSuccess(false)
                  setIsError(false)
                }}
              >
                {'Отменить редактирование'}
              </button>
            </>
      }
    </form>
  )
}
