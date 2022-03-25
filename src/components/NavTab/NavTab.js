import mainConstants from "../../utils/mainConstants";
import "./NavTab.css";

function NavTab() {
  return (
    <section className="nav-tab">
      <h1 className="nav-tab__title">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="nav-tab__buttons">
        {mainConstants.headButtons.map((button, id) => {
          return <a href={button.href} className="nav-tab__button" key={id}>{button.title}</a>
        })}
      </div>
    </section>
  )
}

export default NavTab