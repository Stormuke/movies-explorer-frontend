import './Portfolio.css'

function Portfolio() {

  return (
    <div className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>
      <div className="portfolio__links">
        <a className="portfolio__link" href="https://stormuke.github.io/how-to-learn/">Статичный сайт</a>
        <a className="portfolio__link" href="https://stormuke.github.io/russian-travel/">Адаптивный сайт</a>
        <a className="portfolio__link" href="https://stormuke.nomoredomains.xyz">Одностраничное приложение</a>
      </div>
    </div>
  );
}

export default Portfolio;
