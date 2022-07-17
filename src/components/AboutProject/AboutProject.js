import "./AboutProject.css"
import mainConstants from "../../utils/mainConstants";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title about-project__title_size_m" id="about">О проекте</h2>
      <div className="about-project__wrapper">
        {mainConstants.aboutText.map((item, id) => {
          return (
            <div className="about-project__container" key={id}>
              <h3 className="about-project__title about-project__title_size_s">{item.title}</h3>
              <p className="about-project__text">{item.text}</p>
            </div>
          )
        })}
      </div>
      <div className="line">
        <div className="line__container line__container_type_s">
          <p className="line__title line__title_type_s">1 неделя</p>
          <p className="line__subtitle">Back-end</p>
        </div>
        <div className="line__container line__container_type_l">
          <p className="line__title line__title_type_m">4 недели</p>
          <p className="line__subtitle">Front-end</p>
        </div>
      </div>

    </section>
  )
}

export default AboutProject;
