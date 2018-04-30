import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'


const ErrorPage = () => {

    return (
        <div>
            <div class="tile is-parent">
                <article class="tile is-child notification is-danger">
                    <p class="title">404....</p>
                    <p class="subtitle">Content does not exist</p>
                    <div class="content">

                    </div>
                </article>
            </div>
           <Link to={"/"}><button> Home</button></Link>
        </div>

       
)

}

export default ErrorPage