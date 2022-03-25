import "./Footer.css"
import {useLocation} from "react-router-dom";

function Footer() {
  const pathName = useLocation();

  return (
    pathName.pathname === "/" ||
    pathName.pathname === "/movies" ||
    pathName.pathname === "/saved-movies" ||
    pathName.pathname === "/profile" ?
      <section className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__navigation">
          <p className="footer__copy">
            © 2022
          </p>
          <div className="footer__links">
            <a href="https://passport.yandex.ru" className="footer__link">Яндекс.Практикум</a>
            <a href="https://github.com/Stormuke" className="footer__link">Github</a>
            <a href="https://facebook.com" className="footer__link">Facebook</a>
          </div>
        </div>
      </section> : <></>
  )
}

export default Footer;
