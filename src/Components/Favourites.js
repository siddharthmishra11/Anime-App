import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Favourites extends Component {
    constructor(){
        super();
        this.state = {
            anime: [],
            genre: [],
            curr_genre: "All Genre",
            curr_text: "",
            limit: 5,
            page: [],
            currPage: 1
        }
    }
    updateGenre(){
        let uniqArr = [];
        uniqArr.push("All Genre");
        this.state.anime.forEach((animeObj)=>{
            animeObj.genres.forEach((val)=>{
                if(!uniqArr.includes(val.name))
                {
                    uniqArr.push(val.name);
                }
            })
        })
        this.setState({
            genre: [...uniqArr]
        })
    }
    componentDidMount(){
        let data =  JSON.parse(localStorage.getItem("anime-app")||"[]");
        this.setState({
            anime: [...data]
        },this.updateGenre);
    }
    genreChange = (genre)=>{
         this.setState({
             curr_genre: genre
         })
    }
    sortPopAsc = ()=>{
        let temp = this.state.anime;
        temp.sort((objA,objB)=>{
            return objA.members-objB.members;
        })
        this.setState({
            anime: [...temp]
        });
    }
    sortPopDesc = ()=>{
        let temp = this.state.anime;
        temp.sort((objA,objB)=>{
            return objB.members-objA.members;
        })
        this.setState({
            anime: [...temp]
        });
    }
    sortRatingAsc = ()=>{
        let temp = this.state.anime;
        temp.sort((objA,objB)=>{
            return objA.score-objB.score;
        })
        this.setState({
            anime: [...temp]
        });
    }
    sortRatingDesc = ()=>{
        let temp = this.state.anime;
        temp.sort((objA,objB)=>{
            return objB.score-objA.score;
        })
        this.setState({
            anime: [...temp]
        });
    }
    currPageSet = (pno)=>{
        this.setState({
            currPage: pno
        })
    }
    pagePrev = ()=>{
        let temp = this.state.currPage;
        if(temp>1){
            this.setState({
                currPage: temp-1
            })
        }
    }
    pageInc = ()=>{
        let temp = this.state.currPage;
        if(temp<Math.ceil(this.state.anime.length/this.state.limit)){
            this.setState({
                currPage: temp+1
            })
        }
    }
    deleteItem = (id)=>{
        let temp = this.state.anime;
        temp = temp.filter((animeObj)=>{
            return animeObj.mal_id!=id;
        })
        console.log(temp);
        this.setState({
            anime: [...temp]
        },this.updateGenre)
        localStorage.setItem("anime-app",JSON.stringify(temp));
    }
    render() {
       let filterArr = this.state.anime;
       if(this.state.curr_text!==''){
           filterArr = filterArr.filter((animeObj)=>{
               return animeObj.title.toLowerCase().includes(this.state.curr_text.toLowerCase());
           })
       }
       if(this.state.curr_genre!="All Genre")
       {
           filterArr = filterArr.filter((val)=>{
               let f = false;
               val.genres.forEach((g)=>{
                   if(g.name==this.state.curr_genre)
                   {
                        f = true;
                   }
               })
               return f;
           })
       }
       let li = (this.state.currPage-1)*this.state.limit;
       let ei = Math.min(this.state.anime.length,li+this.state.limit);
       filterArr = filterArr.slice(li,ei);
       let pages = Math.ceil(this.state.anime.length/this.state.limit);
        let pageArr = [];
        for(let i=1;i<=pages;i++)
        {
            pageArr.push(i);
        }
        return (
            <div className = "main">
                <div className = "navbar_own">
                <Link to = '/' style = {{decoration: "none"}}><button type="button nav" class="btn btn-light"><h3>Anime</h3></button></Link>
                <button type="button nav" class="btn btn-light"><h3>Favourites</h3></button>
                </div>
                <div className = "container">
                <div class="row">
                    <div className = "col-lg-3 col-sm-12">
                      <ul class="list-group">
                          {
                              this.state.genre.map((genre)=>{
                              return  genre===this.state.curr_genre?<li class="list-group-item active" aria-current="true">{genre}</li>:
                                     <li class="list-group-item" onClick = {()=>{this.genreChange(genre)}} style = {{cursor: "pointer"}}>{genre}</li>
                              })
                          }
                       </ul>
                   </div>
                      <div className = "col-lg-9 col-sm-12 favourites">
                         <div class="row">
                           <input type = "text" className="input-group-text col" placeholder = "Search Anime" value = {this.state.curr_text} onChange = {(e)=>{this.setState({curr_text: e.target.value})}}></input>
                           <input type = "number" className="input-group-text col" placeholder = "Rows Count" value = {this.state.limit} onChange = {(e)=>{if(e.target.value!=="")this.setState({limit : e.target.value})}}></input>
                         </div>
                     <table class="table">
                        <thead>
                            <tr>
                              <th scope="col">Title</th>
                              <th scope="col">Genre</th>
                              <th scope="col">
                                <div style = {{display: "flex"}}>
                                Members
                                 <div style = {{display: "flex", flexDirection: "column", paddingLeft: "5px"}}>
                                 <i onClick = {this.sortPopDesc} class="fas fa-sort-up"></i>
                                 <i onClick = {this.sortPopAsc} class="fas fa-sort-down"></i>
                              </div>
                              </div>
                              </th>
                              <th scope="col">
                              <div style = {{display: "flex"}}>
                                  Score
                                 <div style = {{display: "flex", flexDirection: "column", paddingLeft: "5px"}}>
                                 <i onClick = {this.sortRatingDesc} class="fas fa-sort-up"></i>
                                 <i onClick = {this.sortRatingAsc} class="fas fa-sort-down"></i>
                              </div>
                              </div>
                              </th>
                              <th scope="col"></th>
                            </tr>
                        </thead>
                    <tbody>
                         { 
                            filterArr.map((animeObj)=>{
                              let link = `/anime?id=${animeObj.mal_id}`;
                               return <tr>
                                 <th scope="row"><Link to =  {link} state = {{id: animeObj.mal_id}} style = {{decoration: "none"}}><img src={animeObj.images.jpg.image_url} style = {{height: "4rem"}}alt={animeObj.title}/></Link> {animeObj.title}</th>
                                 <td>
                                 <ul class="tags">
                                    {
                                     animeObj.genres.map((val)=><li><a href="#" class="tag">{val.name}</a></li>)
                                  }
                                </ul>
                                </td>
                                 <td>{animeObj.members}</td>
                                 <td>{animeObj.score}</td>
                                 <td><button type="button" class="btn btn-danger" onClick = {()=>this.deleteItem(animeObj.mal_id)}>Delete</button></td>
                                </tr>
                            })
                         }
                          </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                         <ul class="pagination">
                          <li class="page-item" onClick = {this.pagePrev}><a class="page-link" href="#">Previous</a></li>
                          {
                               pageArr.map((idx)=>{
                                  return <li class="page-item" onClick = {()=>{this.currPageSet(idx)}}><a class="page-link" href="#">{idx}</a></li>
                              })
                              
                          }
                          <li class="page-item" onClick = {this.pageInc}><a class="page-link" href="#">Next</a></li>
                         </ul>
                       </nav>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}
