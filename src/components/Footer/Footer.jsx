import { PRACTICUM_URL, GITHUB_URL } from '../../utils/UrlConstants';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__subtitle">
          &copy; {new Date().getFullYear()}
        </p>
        <nav className="footer__navigation">
          <a
            href={PRACTICUM_URL}
            target='_blank'
            className="footer__link"
            rel="noreferrer">
              Яндекс.Практикум
          </a>
          <a
            href={GITHUB_URL}
            target='_blank'
            className="footer__link"
            rel="noreferrer">
              Github
          </a>
        </nav>
      </div>
    </footer>
  );
};
