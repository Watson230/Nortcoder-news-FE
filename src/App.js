import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import BlogFeed from './components/blogFeed'
import Article from './components/article'
import Topics from './components/topicsFeed'
import NavBar from './components/navbar'
import commentsFeed from './components/commentsFeed'
import UserProfile from './components/userProfile'
import Users from './components/users'

import './App.css';

class App extends Component {

  state = {
    pageNum: 0
  }
  render() {
    return (
      
    
        <BrowserRouter>

          <Switch>
            <Route exact path="/" component={HomeFeed} />
            <Route path="/article/:postId" component={Article} />
            <Route exact path="/articles/page/:pageNumber" component={Feed} />
            <Route path="/articles/:article_id/comments" component={commentsFeed} />
            <Route path="/users/:username" component={UserProfile} />
            <Route path="/article/:article_id" component={Article} />
            <Route path="/users" component={Users} />

            <Route path="/topics" component={Topics} />
          </Switch>
        </BrowserRouter>
      
    );
  }
}

const HomeFeed = (props) => {

  return (
    <div>
      <NavBar tab={'latest'}/>
      <div style={{ "margin-bottom": "50px" }} class="container">
        <div class="notification" style={{ "text-aline": "center" }}>
          <p class="title is-3 ">Most Popular On NorthCoder News</p>
        </div>
      </div>
      <div class="container">
        <BlogFeed endPoint={'articles/mostPopular'} />
      </div>
    </div>
  )
}

const Feed = (props) => {
  let pageNumber
  if (props.match.params.pageNumber > 0) {
    pageNumber = props.match.params.pageNumber
  } else pageNumber = 0

  return (
    <div>
      <NavBar tab={'articles'}/>

      <div class="container">
        <div class="notification" style={{ "text-aline": "center" ,"margin-bottom":"20px"}}>
          <p class="title is-3 ">Northcoder News Articles</p>
        </div>
      </div>
      <div style={{ "text-align": "center" }}>
        <div class="container" style={{ "width": "1000px", "text-align": "center", "margin-bottom": "20px" }}>
          <button class="button is-medium" style={{ "margin-right": "20px" }} ><Link to={`/articles/page/${Number(pageNumber) - 1}`}>Prev Page</Link></button>

          <span class="title is-4"> {`Page ${parseInt(pageNumber) + 1}`}</span>

          <button class="button is-medium" style={{ "margin-left": "20px" }} ><Link to={`/articles/page/${Number(pageNumber) + 1}`}> Next Page</Link></button>
        </div>
      </div>
      <div class="container">
        <BlogFeed endPoint={'articles'} pageNum={pageNumber} />
      </div>

      <div style={{ "text-align": "center", "margin-bottom": "20px", "margin-top": "20px" }}>
        <div class="container" style={{ "width": "1000px", "text-align": "center" }}>
          <button class="button is-medium" style={{ "margin-right": "20px" }} ><Link to={`/articles/page/${Number(pageNumber) - 1}`}>Prev Page</Link></button>

          <span class="title is-4"> {`Page ${parseInt(pageNumber) + 1}`}</span>

          <button class="button is-medium" style={{ "margin-left": "20px" }} ><Link to={`/articles/page/${Number(pageNumber) + 1}`}> Next Page</Link></button>
        </div>
      </div>


    </div>
  )
}



export default App;
