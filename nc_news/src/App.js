import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import BlogFeed from './components/blogFeed'
import Article from './components/article'
import Topics from  './components/topicsFeed'
import NavBar  from './components/navbar'

import './App.css';

class App extends Component {
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
  let  pageNumber =0
  if(props.match.params.pageNumber>0){
  pageNumber = props.match.params.pageNumber
  }

  return (
    <div>
    <NavBar/>
      <h2> {`Page ${pageNumber}`}</h2>
      <div>
      <BlogFeed endPoint ={'articles'} pageNum={pageNumber} />
      </div>
    </div>
  )
}



export default App;
