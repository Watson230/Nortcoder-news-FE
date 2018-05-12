import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import CommentsFeed from './commentsFeed'
import NavBar from './navbar'
import {getArticleByID} from '../api'

const API_URL= `https://damp-everglades-92072.herokuapp.com/api`
class Article extends Component {

    state = {

        article: {},


    }

    componentWillMount() {
            getArticleByID(this.props.match.params.postId)
            .then(body => {
                this.setState({
                    article: body[0]
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
                <NavBar tab={'articles'} />

              <div className="box" >
                <div className="card" style={{ "margin-top": "10px" }}>
                    <header className="card-header">
                        <div style={{ "margin-bottom": "10px" ,"margin-top": "10px","margin-left": "10px" }}>
                            <div>
                                <p className="card-header-title" className="title is-2">
                                    {this.state.article.title}
                                </p>
                            </div>
                            <div>
                                <h2 className="subtitle is-3"><Link to={"/topics"}>{`# ${this.state.article.belongs_to}`}</Link></h2>
                            </div>
                        </div>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            {this.state.article.body}

                            <br />
                            <div>
                                <ul>
                                    <li><Link to={`/users/${this.state.article.created_by}`}>{`Created_By: ${this.state.article.created_by ? this.state.article.created_by : 'loading...'}`}</Link></li>

                                    <li>{`Time: ${this.state.article.created_at ? this.state.article.created_at.split('').slice(15,this.state.article.created_at.length).join('') : 'loading....'}`}</li>
                                    <li>{`Date: ${this.state.article.created_at ? this.state.article.created_at.split('').slice(0,15).join('') : 'loading....'}`}</li>
                                    

                                </ul>

                            </div>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <Link to={`/users/${this.state.article.created_by}`} className="card-footer-item">{`${this.state.article.created_by}'s profile`}</Link>

                    </footer>

                </div>
                </div>

                <div className="box">
                <CommentsFeed postId={this.props.match.params.postId} />

                </div>



            </div>
        )

    }


}

export default Article