import React, { Component } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
export default class Anime extends Component {
    constructor(){
        super();
        this.state = {
            hover: '',
            par: [1],
            anime: [],
            currPage: 1,
            fav: [],
            currSearch: "",
            searchOn: false
        }
    }
    async componentDidMount(){
        const res = await axios.get(`https://api.jikan.moe/v3/top/anime/${this.state.currPage}`);
        this.setState({
            anime: [...res.data.top]
        })
        let oldData = JSON.parse(localStorage.getItem("anime-app")||"[]");
        oldData = oldData.map((val)=>val.mal_id);
        this.setState({
            fav: [...oldData]
        })
    }
    changeMovies = async()=>{
        const res = await axios.get(`https://api.jikan.moe/v3/top/anime/${this.state.currPage}`);
        console.log(`https://api.jikan.moe/v3/top/anime/${this.state.currPage}`);
        this.setState({
            anime: [...res.data.top]
        })
    }
    handleRight = ()=>{
        this.setState({
            par: [...this.state.par,this.state.par.length+1],
            currPage: this.state.currPage+1
        },()=>{
            this.state.searchOn?this.handleSearch():this.changeMovies();
        });
    }
    handleLeft = ()=>{
        this.setState({
            currPage: this.state.currPage-1
        },()=>{
            this.state.searchOn?this.handleSearch():this.changeMovies();
        });
    }
    handleClick = (val)=>{
        this.setState({
            currPage: val
        },()=>{
            this.state.searchOn?this.handleSearch():this.changeMovies();
        });
    }
    handleFav = (id)=>{
        let oldData = JSON.parse(localStorage.getItem("anime-app")||"[]");
        if(this.state.fav.includes(id)){
            oldData = oldData.filter((animeObj)=>animeObj.mal_id!=id);
            localStorage.setItem("anime-app",JSON.stringify(oldData));
            this.handleFavState();
        }
        else{
            axios.get(`https://api.jikan.moe/v4/anime/${id}`).then((res)=>{
                let val = res.data.data;
                oldData.push(val);
                localStorage.setItem("anime-app",JSON.stringify(oldData));
                this.handleFavState();
            })
        }
    }
    handleFavState = ()=>{
        let oldData = JSON.parse(localStorage.getItem("anime-app")||"[]");
        let temp = oldData.map((animeObj)=>animeObj.mal_id);
         this.setState({
             fav: [...temp]
         })
    }
    handleSearch = ()=>{
        axios.get(`https://api.jikan.moe/v4/anime?q=${this.state.currSearch}&page=${this.state.currPage}`).then((data)=>{
            let res = data.data.data;
            console.log(res.length)
            if(res.length===0)
            {
                let temp = this.state.par;
               if(this.state.currPage>1){
                temp.pop();
                this.setState({
                   par: [...temp],
                   currPage: this.state.currPage-1 
                })
              }
            }
            else{
                this.setState({
                    anime: [...res],
                })
            }
        })
    }
    submit = ()=>{
        axios.get(`https://api.jikan.moe/v4/anime?q=${this.state.currSearch}&page=1`).then((data)=>{
            let res = data.data.data;
            this.setState({
                anime: [...res],
                currPage: 1,
                par: [1],
                searchOn: true
            })
        });
    }
    revert = ()=>{
        this.setState({
            par: [1],
            currPage: 1,
            currSearch: "",
            searchOn: false
        },this.changeMovies)
    }
    render() {
        return (
            <>
                {
                    this.state.length === 0?
                    <div classNamr="spinner-border" role="status">
                    <span className="sr-only"/>
                    </div>
                     :
                     <div className = "acc">
                        <div class="sky">
                       <div class="star"></div>
                        <div class="star"></div>
                        <div class="star"></div>
                        <div class="star"></div>
                        <div class="star"></div>
                        <div class="star"></div>
                        <div class="star"></div>
                       </div>
                         <div class="input-group mb-3 search">
                         <input type="text" class="form-control" placeholder="Search Anime" aria-label="Recipient's username" aria-describedby="basic-addon2"  value = {this.state.curr_text} onChange = {(e)=>{this.setState({currSearch: e.target.value})}}/>
                         <span class="input-group-text sub" id="basic-addon2" onClick = {this.submit}>Submit</span>
                         </div>
                         <h1 className = "text-center" onClick = {this.revert} style = {{cursor: "pointer",color: "#D6E5FA"}}><strong>Top Rated</strong></h1>
                         <div class = "anime-list">
                             {this.state.anime.map((animeObj,idx)=>{ 
                                 let link = `/anime?id=${animeObj.mal_id}`;
                                 let src = this.state.searchOn?animeObj.images.jpg.image_url:animeObj.image_url;
                                 return <div className="card anime-card" onMouseEnter = {()=>{this.setState({hover: idx})}} onMouseLeave = {()=>{this.setState({hover: ''})}}>
                                 <Link to =  {link} state = {{id: animeObj.mal_id}} style = {{decoration: "none"}}><img src={src} className="card-img-top anime-image" alt={animeObj.title}/></Link>
                                 {/* <div className="card-body"> */}
                                 <h6 className="card-title anime-title">{animeObj.title}</h6>
                                  <div className = "butt-on-wrapper" style = {{display: "flex",justifyContent: "center",width: "100%"}}>
                                  {
                                      this.state.hover===idx && 
                                          <a className={this.state.fav.includes(animeObj.mal_id)?"btn btn-danger anime-button":"btn btn-primary anime-button"} onClick = {()=>this.handleFav(animeObj.mal_id)}>{this.state.fav.includes(animeObj.mal_id)?"Remove From Favourites":"Add to Favourites"}</a>
                                    }
                                 </div>
                                 </div>
                             })
                            }
                         </div>
    
                         <div className = "pagination-wrapper rel">
                            <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                            <li class="page-item"><a class="page-link" onClick = {this.handleLeft}>&laquo;</a></li>
                             {
                                 this.state.par.map((id)=>{
                                   return <li class="page-item"><a class="page-link" onClick = {()=>{this.handleClick(id)}}>{id}</a></li>
                                 })
                            }   
                            <li class="page-item"><a class="page-link" onClick = {this.handleRight}>&raquo;</a></li>
                            </ul>
                            </nav>
                           </div>
                        
                     </div>
                }
            </>
        )
    }
}
