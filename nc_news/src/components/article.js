import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Comments from './comments'

class Article extends Component {

    state = {

        article: {},


    }

    componentWillMount() {

        console.log(this.props.match.params)
        fetch(`https://northcoders-sprints-api.now.sh/api/news/articles/${this.props.match.params.postId}`)
            .then(res => {
                console.log(res)
                // if(res.status ===  404 ){
                //     throw new Error('Content does not exist')
                // }
                return res.json();
            })
            .then(body => {

                this.setState({

                    article: body.article

                })
            })
            .catch(err => {

                console.log(err)
                this.props.history.push('/404')

            })


    }



    render() {


        return (

            <div>

                {/* <h1 class="title">{this.state.article.title}</h1>
                <h2 class="subtitle"><Link to={"/topics"}>{`# ${this.state.article.belongs_to}`}</Link></h2>
                <p>{this.state.article.body}</p> */}
                <div class="card">
                <header class="card-header">
                    <p className="card-header-title" className="title is-1">
                        {this.state.article.title}
                    </p>
                   
                   
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </a>
                 
                    <h2 class="subtitle"><Link to={"/topics"}>{`# ${this.state.article.belongs_to}`}</Link></h2>
                </header>
                <div class="card-content">
                    <div class="content">
                        {this.state.article.body}

                        <br />
                        <ul>
                            <li><Link to={`/users/${this.state.article.created_by}`}>{`Created_By: ${this.state.article.created_by ? this.state.article.created_by : 'loading...'}`}</Link></li>

                            <li>{`Time: ${this.state.article.created_at ? this.state.article.created_at.split('T')[1].split('.')[0] : 'loading....'}`}</li>
                            <li>{`Date: ${this.state.article.created_at ? this.state.article.created_at.split('T')[0] : 'loading....'}`}</li>

                        </ul>

                    </div>
                </div>
                <footer class="card-footer">
                    <Link to={`/users/${this.state.article.created_by}`} class="card-footer-item">{`${this.state.article.created_by}'s profile`}</Link>

                </footer>

                    </div>


                <Comments postId={this.props.match.params.postId} />





            </div>
        )

    }


}

export default Article