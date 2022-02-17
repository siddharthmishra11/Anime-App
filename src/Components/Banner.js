import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Banner extends Component {
    render() {
        return (
          <div>
           <div className = "navbar_own">
                <button type="button nav" class="btn btn-dark"><h3>Anime</h3></button>
                <Link to = '/favourites' style = {{decoration: "none"}}><button type="button nav" class="btn btn-dark"><h3>Favourites</h3></button></Link>
           </div>
           <div className="card banner-card">
          <img src="https://wallpaperboat.com/wp-content/uploads/2020/04/aesthetic-anime-wallpaper-desktop-5.jpg" className="banner-image" alt="ANIME"/>
        
           <div className="card-body">
           <h2>Welcome To Your Anime List</h2>
           </div>
           </div>
           </div>
        )
    }
}
