import React, { Component } from 'react';
import BlogFeed from './BlogFeed'

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