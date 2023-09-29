import './Promo.css';

export default function Promo() {
  return (
    <section className="promo__main">
      <div className="promo__about">
        <h1 className="promo__title">
          Учебный проект студента факультета<br /> Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a href='#aboutProject' className="promo__link">
          Узнать больше
        </a>
      </div>
      <div className="promo__logo" />
    </section>
  );
};
