import logo from './logo.svg';
import Banner from './Components/Banner';
import Anime from './Components/Anime'
import Favourites from './Components/Favourites'
import AnimePg from './Components/AnimePg'
import './App.css';
import React from "react"
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes> 
      <Route path = "/" element = {[<Banner/>,<Anime/>]}/>
      <Route path = "/favourites" element = {<Favourites/>}/>
      <Route path = "/anime" element = {<AnimePg/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
