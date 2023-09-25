import { useContext } from 'react'
import SendContext from '../../contexts/SendContext'
import './Input.css'

export default function Input({
    selectname,
    name,
    type,
    title,
    minLength,
    value,
    isInputValid,
    error,
    onChange,
    pattern,
    isEdit,
    placeholder
  })
  {
    const isSend = useContext(SendContext)

    return (
      <>
        {selectname !== 'profile' ?
          <label className='login'>
            <span className='login__subtitle'>
              {title}
            </span>
            <input
              required
              type={type}
              name={name}
              minLength={minLength || ''}
              className={`
                login__input
                ${isInputValid === undefined
                  || isInputValid
                  ? ''
                  : 'login__input_invaid'
                }`
              }
              value={value || ''}
              onChange={onChange}
              autoComplete='on'
              disabled={isSend}
              pattern={pattern}
              placeholder={placeholder}
            />
            <span className='login__error'>
              {error}
            </span>
          </label>
          :
          <>
          <label className='profile'>
            <span className='profile__subtitle'>
              {title}
            </span>
            <input
              required
              type={type}
              name={name}
              minLength={minLength || ''}
              className={`
                profile__input
                ${isInputValid === undefined
                  || isInputValid
                  ? ''
                  : 'profile__input_invaid'
                }`
              }
              value={value || ''}
              onChange={onChange}
              disabled={isSend || !isEdit}
              pattern={pattern}
            />
          </label>
          <span className={`
            profile__error
            ${name === 'username'
              ? 'profile__error_type_name'
              : ''
            }`
          }>
            {error}
          </span>
          </>
        }
      </>
    )
}
