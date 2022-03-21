import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import {Route, Routes} from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Sign from "../Sign/Sign";


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={
          <Main/>
        }/>
        <Route path="/movies" element={
          <Movies/>
        }/>
        <Route path="/saved-movies" element={
          <SavedMovies/>
        }/>
        <Route path="/profile" element={
          <Profile/>
        }/>
        <Route path="/signup" element={
          <Sign/>
        }/>
        <Route path="/signin" element={
          <Sign/>
        }/>
        <Route path="*" element={
          <NotFound/>
        }/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
