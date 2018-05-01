import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import BlogFeed from './components/blogFeed'
import Article from './components/article'
import Topics from './components/topicsFeed'
import NavBar from './components/navbar'
import commentsFeed from './components/commentsFeed'
import UserProfile from './components/userProfile'
import Users from './components/users'
import ErrorPage from'./components/404'
import Feed from './components/articleFeed'
import HomeFeed from './components/homeFeed'

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
            <Route exact path="/articles" component={Feed} />
            <Route path="/articles/:article_id/comments" component={commentsFeed} />
            <Route path="/users/:username" component={UserProfile} />
            <Route path="/article/:article_id" component={Article} />
            <Route path="/users" component={Users} />
            <Route path="/topics" component={Topics} />
            <Route path="/404" component={ErrorPage} />
            <Route component={ErrorPage}/>
          </Switch>
        </BrowserRouter>
      
    );
  }
}


export default App;
