import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import BlogFeed from './components/blogFeed'
import Article from './components/article'
import Topics from  './components/topicsFeed'
import NavBar  from './components/navbar'
import comments from './components/comments'
import User from './components/userProfile'

import './App.css';

class App extends Component {

  state={
    pageNum:0
  }
  render() {
    return (
      <div>
        <section class="hero is-danger">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                NorthCoder News
      </h1>
              <h2 class="subtitle">
                News for Northcoders in the North
      </h2>
            </div>
          </div>
        </section>

    
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomeFeed}/> 
            <Route path="/article/:postId" component={Article} />
            <Route exact path="/articles/page/:pageNumber" component={Feed} />
            <Route path="/articles/:article_id/comments" component={comments}/>
            <Route path="/users/:username" component={User}/>
            <Route path="/article/:article_id" component={Article}/>
          
            <Route path="/topics" component={Topics} />       
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const HomeFeed = (props) => {

  return (
    <div>
    <NavBar/>
      <h2> latest From NC News</h2>
      <div>
      <BlogFeed endPoint ={'articles'} pageNum={0} />
      </div>
    </div>
  )
}

const Feed = (props) => {
 let pageNumber
  if(props.match.params.pageNumber>0){
  pageNumber = props.match.params.pageNumber
  } else pageNumber =0

  return (
    <div>
    <NavBar/>
      <h2> {`Page ${pageNumber}`}</h2>
      <div>
        <button><Link to={`/articles/page/${Number(pageNumber)-1 }`}>Prev Page</Link></button>   <button><Link to={`/articles/page/${Number(pageNumber)+1 }`}> Next Page</Link></button>
      <BlogFeed endPoint ={'articles'} pageNum={pageNumber} />
      </div>
    </div>
  )
}



export default App;
