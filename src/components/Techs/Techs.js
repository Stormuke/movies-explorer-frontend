import "./Techs.css"
import mainConstants from "../../utils/mainConstants";

function Techs() {
  return(
    <section className="techs" id="tech">
      <div className="techs__container">
        <h2 className="techs__title techs__title_size_s">Технологии</h2>
        <div className="techs__subtitle-container">
          <p className="techs__subtitle">7 технологий</p>
          <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
      </div>
      <div className="techs__buttons">
        {mainConstants.techButtons.map((item, id) => {
          return <a href={item.href} target="_blank" key={id} className="techs__button">{item.title}</a>
        })}
      </div>
    </section>
  )
}

export default Techs;
