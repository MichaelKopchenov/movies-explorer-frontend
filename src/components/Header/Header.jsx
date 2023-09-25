import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import './Header.css'


export default function Header({ name, loggedIn }) {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  function handelClick() {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  function clickLink() {
    setIsOpen(false)
  }

  useEffect(() => {
    function closeBurgerForResize() {
      if (document.documentElement.clientWidth > '767') {
        setIsOpen(false)
        window.removeEventListener('resize', closeBurgerForResize)
      }
    }
    if (isOpen) {
      window.addEventListener('resize', closeBurgerForResize)
      return () => window.removeEventListener('resize', closeBurgerForResize)
    }
  }, [isOpen])

  return (
    <header className={`
      header__main
      ${name !== 'home'
        ? 'header__main_type_transparent'
        : ''
      }
      `}
    >
      <div>
        <Link to={'/'} className="header__navigation-home" />
      </div>
      {name === 'home' && !loggedIn ?
        <nav>
          <ul className='header__navigation-list'>
            <li>
              <Link to={'/signup'} className="header__signup">
                Регистрация
              </Link>
            </li>
            <li>
              <Link to={'/signin'} className="header__signin">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
        :
        <>
          <nav className={`
            header__nav
            ${isOpen
              ? 'header__nav_open'
              : ''
            }
            `}
          >
            <ul className='header__navigation-list header__navigation-list_type_ul'>
              <li className='header__nav-list_type_ul'>
                <Link
                  to={'/'}
                  className={`
                    header__link
                    ${pathname === '/'
                    ? 'header__link_active'
                    : ''
                  }
                  `}
                  onClick={clickLink}
                >
                  Главная
                </Link>
              </li>
              <li className='header__nav-list_type_ul'>
                <Link
                  to={'/movies'}
                  className={`
                    header__link
                    ${pathname === '/movies'
                      ? 'header__link_active'
                      : ''
                    }
                    `}
                  onClick={clickLink}
                >
                  Фильмы
                </Link>
              </li>
              <li className='header__nav-list_type_ul'>
                <Link
                  to={'/saved-movies'}
                  className={`
                    header__link
                    ${pathname === '/saved-movies'
                    ? 'header__link_active'
                    : ''
                  }
                  `}
                  onClick={clickLink}
                >
                  Сохранённые фильмы
                </Link>
              </li>
              <li className='header__nav-list_type_ul'>
                <Link
                  to={'/profile'}
                  className={`
                    header__link
                    header__link_type_account
                    ${pathname === '/profile'
                    ? 'header__link_active'
                    : ''
                  }
                  `}
                  onClick={clickLink}
                >
                  Аккаунт
                <div className='header__account-icon' />
                </Link>
              </li>
            </ul>
            <button
              type='button'
              className='header__menu-close'
              onClick={handelClick}
            />
          </nav>
          <button
            type='button'
            className='header__menu'
            onClick={handelClick}
          />
        </>
      }
    </header>
  )
}
