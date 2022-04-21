import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Sign from "../Sign/Sign";
import Login from "../Login/Login";
import SideBar from "../SideBar/SideBar";
import {useEffect, useState} from "react";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {CurrentUserContext} from "../../utils/CurrentUserContext";

function App() {
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [movieCards, setMovieCards] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true)
          }
        })
        .catch((err) => {
          console.log(`Не удалось получить токен: ${err}`)
        })
    }
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      MainApi.getCurrentUser(jwt)
        .then(res => setCurrentUser(res.user))
    }
  }, [isLoggedIn])


  useEffect(() => {
      MoviesApi.getMovies()
        .then(res => {
          setMovieCards(res)
          localStorage.setItem('movieList', JSON.stringify(movieCards));
        })
        .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    MainApi.getSavedFilms(jwt)
      .then(res => {
        setSavedMovies(res.filter((i) => i.owner === currentUser._id));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
      })
      .catch(err => console.log(err))
  }, [])

  function onRegistration(input) {
    MainApi.registration(input)
      .then(res => navigate("/signin"))
      .catch(err => console.log(err))

  }

  function onLogin(input) {
    MainApi.login(input)
      .then((res) => {
        console.log(res)
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        navigate("/movies")
      })
      .catch(err => console.log(err))
      .finally(() => {

      })
  }

  function onSaveMovie(card) {
    console.log(card)
    const jwt = localStorage.getItem("jwt")
    MainApi.saveMovie(card, jwt)
      .then(res => {
        console.log(res)
        setSavedMovies([...savedMovies, res])
      })
  }

  function onDeleteMovie(card) {
    const jwt = localStorage.getItem("jwt");
    const savedMovie = savedMovies.find(
      (item) => item.movieId === card.movieId
    );
    MainApi.deleteMovie(card, jwt)
      .then(() => {
        const newCardArr = savedMovies.filter(
          (item) => item._id !== savedMovie._id
        );
        setSavedMovies(newCardArr)
      })
  }

  function handleEditProfile(user) {
    const jwt = localStorage.getItem("jwt");
    MainApi.editCurrentUser(jwt, user)
      .then(res => setCurrentUser(res))
  }

  function handleSideBarOpen() {
    setIsSideBarActive(true)
  }

  function handleCloseSideBar() {
    setIsSideBarActive(false)
  }

  function signOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('movieList');
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header onSideBarOpen={handleSideBarOpen} isLogged={isLoggedIn}/>
        <Routes>
          <Route path="/" element={
            <Main/>
          }
          />

          <Route path="/signup" element={
            <Sign submit={onRegistration}/>
          }/>

          <Route path="/signin" element={
            <Login submit={onLogin}/>
          }/>

          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Movies
                  savedMovies={savedMovies}
                  movieCards={movieCards}
                  onSave={onSaveMovie}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <SavedMovies
                  movieCards={savedMovies}
                  onDelete={onDeleteMovie}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile
                  onSubmit={handleEditProfile}
                  signOut={signOut}/>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={
            <NotFound/>
          }/>
        </Routes>
        <Footer/>
        <SideBar
          isOpen={isSideBarActive}
          onClose={handleCloseSideBar}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
