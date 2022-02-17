import React from 'react'
import {useLocation,Link} from "react-router-dom";
import {useEffect,useState} from 'react'
import axios from 'axios'
function AnimePg() {
    const location = useLocation();
    const {id} = location.state;
    let [anime,setAnime] = useState({});
    useEffect(()=>{
        axios.get(`https://api.jikan.moe/v4/anime/${id}`).then((res)=>{
            let val = res.data.data;
            setAnime(val);
        })
    },[])
      if("images" in anime)
      {
        return (
            <div className = "main" style = {{minHeight: "100vh"}}>
                <div className = "navbar_own">
                <Link to = '/' style = {{decoration: "none"}}><button type="button nav" class="btn btn-light"><h3>Anime</h3></button></Link>
                <Link to = '/favourites' style = {{decoration: "none"}}><button type="button nav" class="btn btn-light"><h3>Favourites</h3></button></Link>
                </div>
                 <div className="card mb-3" style={{minWidth: "100vw",minHeight: "100vh"}}>
                 <div className="row g-0">
                 <div className="col-md-4">
                 <img src={anime.images.jpg.large_image_url} className="img-fluid rounded-start" alt="..."/>
                 </div>
          <div className="col-md-8">
          <div className="card-body">
          <div className="card-title"><iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0"width="712" height="400" type="text/html" src={`${anime.trailer.embed_url}?autoplay=1`} ></iframe></div>
          <div className="card-text">
          <table class="table">
  <thead>
    <tr>
        <th scope="col" style = {{color: "#2666CF"}}>Title</th>
         <th scope="col" style = {{color: "#2666CF"}}>Score</th>
         <th scope="col" style = {{color: "#2666CF"}}>Ranked</th>
         <th scope="col" style = {{color: "#2666CF"}}>Popularity</th>
         <th scope="col" style = {{color: "#2666CF"}}>Member</th>
         </tr>
         </thead>
        <tbody>
         <tr>
         <td>{anime.title_japanese}</td>
          <td>{anime.score}</td>
          <td>#{anime.rank}</td>
          <td>#{anime.popularity}</td>
          <td>{anime.members}</td>
          </tr>
          </tbody>
          </table>
          </div>
          <h2 style = {{color: "#2666CF"}}>Synopsis</h2>
          <p className="card-text" style = {{color: "#121212"}}>{anime.synopsis}</p>
          </div>
          </div>
          </div>
          </div>
          </div>
        )
      }
      else{
          return (
              <>
              </>
          );
      }
        
 }
export default AnimePg

