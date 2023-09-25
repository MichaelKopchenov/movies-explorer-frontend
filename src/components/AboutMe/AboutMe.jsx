import avatar from '../../images/Avatar.jpeg'
import Container from "../Container/Container"
import './AboutMe.css'

export default function AboutMe() {
  return (
    <section className="aboutme">
      <Container>
        <h2 className="aboutme__title">Студент</h2>
        <div className="aboutme__container">
          <div className="aboutme__text-container">
            <h3 className="aboutme__name">Виталий</h3>
            <p className="aboutme__job">Фронтенд-разработчик, 30 лет</p>
            <p className="aboutme__description">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове,
              закончил факультет экономики СГУ. У&nbsp;меня есть жена
              и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
              Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
              После того, как прошёл курс по&nbsp;веб-разработке,
              начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
            <a
              href='https://github.com/MichaelKopchenov'
              target='_blank'
              className="aboutme__link"
              rel="noreferrer">
                Github
            </a>
          </div>
          <img
            src={avatar}
            alt="Аватар"
            className="aboutme__avatar"
          />
        </div>
      </Container>
    </section>
  )
}
