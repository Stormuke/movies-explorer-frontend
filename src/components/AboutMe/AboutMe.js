import "./AboutMe.css";
import mainConstants from "../../utils/mainConstants";
import photo from "../../image/photo_2021-11-16_11-46-50.jpg"

function AboutMe() {
  return(
    <section className="about-me">
      <h2 className="about-me__title" id="student">Студент</h2>
      <div className="about-me__container">
        <div className="description">
          <h2 className="description__title">Алексей</h2>
          <p className="description__subtitle">Фронтенд-разработчик, 28 лет</p>
          <p className="description__text">
            Я родился и живу в Москве. Я люблю слушать музыку, а ещё увлекаюсь автомобилями.
            Недавно начал кодить. С 2015 года работал в компании «Бабилон».
            После того, как прошёл курс по веб-разработке, устроился в крупную ИТ компанию.
          </p>
          <div className="description__links">
            {mainConstants.aboutMeLinks.map((item, id) => {
              return <a href={item.link} className="description__link" key={id}>{item.title}</a>
            })}
          </div>
        </div>
        <img className="about-me__image" src={photo} alt="это я"/>
      </div>
    </section>
  )
}

export default AboutMe;
