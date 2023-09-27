import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { MEDIUM_SCREEN } from '../../utils/constants';
import {
  HOME_ROUTE,
  REGISTRATION_ROUTE,
  LOGIN_ROUTE,
  MOVIES_ROUTE,
  FAVORITE_MOVIES_ROUTE,
  PROFILE_ROUTE
} from '../../utils/RouteConstants';
import './Header.css';


export default function Header({ name, loggedIn }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  function handelClick() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  function clickLink() {
    setIsOpen(false);
  };

  useEffect(() => {
    function closeMenuResize() {
      if (document.documentElement.clientWidth > MEDIUM_SCREEN) {
        setIsOpen(false);
        window.removeEventListener('resize', closeMenuResize);
      }
    }
    if (isOpen) {
      window.addEventListener('resize', closeMenuResize);
      return () => window.removeEventListener('resize', closeMenuResize);
    }
  }, [isOpen]);

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
        <Link to={HOME_ROUTE} className="header__navigation-home" />
      </div>
      {name
        === 'home'
        && !loggedIn
        ? <nav>
            <ul className='header__navigation-list'>
              <li>
                <Link to={REGISTRATION_ROUTE} className="header__signup">
                  Регистрация
                </Link>
              </li>
              <li>
                <Link to={LOGIN_ROUTE} className="header__signin">
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        : <>
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
                    to={HOME_ROUTE}
                    onClick={clickLink}
                    className={`
                      header__link
                      ${pathname === HOME_ROUTE
                      ? 'header__link_active'
                      : ''
                    }
                  `}
                  >
                    Главная
                  </Link>
                </li>
                <li className='header__nav-list_type_ul'>
                  <Link
                    to={MOVIES_ROUTE}
                    onClick={clickLink}
                    className={`
                      header__link
                      ${pathname === MOVIES_ROUTE
                        ? 'header__link_active'
                        : ''
                      }
                  `}
                  >
                    Фильмы
                  </Link>
                </li>
                <li className='header__nav-list_type_ul'>
                  <Link
                    to={FAVORITE_MOVIES_ROUTE}
                    onClick={clickLink}
                    className={`
                      header__link
                      ${pathname === FAVORITE_MOVIES_ROUTE
                      ? 'header__link_active'
                      : ''
                    }
                  `}
                  >
                    Сохранённые фильмы
                  </Link>
                </li>
                <li className='header__nav-list_type_ul'>
                  <Link
                    to={PROFILE_ROUTE}
                    onClick={clickLink}
                    className={`
                      header__link
                      header__link_type_account
                      ${pathname === PROFILE_ROUTE
                      ? 'header__link_active'
                      : ''
                    }
                  `}
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
