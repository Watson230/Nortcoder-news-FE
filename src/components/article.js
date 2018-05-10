import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import CommentsFeed from './commentsFeed'
import NavBar from './navbar'

const API_URL= `https://damp-everglades-92072.herokuapp.com/api`
class Article extends Component {

    state = {

        article: {},


    }

    componentWillMount() {

        console.log(this.props.match.params)
        fetch(`${API_URL}/articles/${this.props.match.params.postId}`)
            .then(res => {
                console.log(res)
                // if(res.status ===  404 ){
                //     throw new Error('Content does not exist')
                // }
                return res.json();
            })
            .then(body => {
                console.log('articles',body)
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
                <NavBar />

                {/* <div className="article NavButtons" style={{ "text-align": "center" }} >
                    <div class="container" style={{ "width": "1000px", "text-align": "center", "margin-bottom": "20px" }}>
                        <button class="button is-medium" onClick={this.pageChangeHandler} style={{ "margin-right": "20px" }} >Prev Article</button>


                        <button class="button is-medium" onClick={this.pageChangeHandler} style={{ "margin-left": "20px" }} >Next Article</button>
                    </div>
                </div> */}

                <div className="container" >
                <div className="card" style={{ "margin-top": "10px" }}>
                    <header className="card-header">
                        <div style={{ "margin-bottom": "10px" ,"margin-top": "10px","margin-left": "10px" }}>
                            <div>
                                <p classNameName="card-header-title" classNameName="title is-2">
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

                                    <li>{`Time: ${this.state.article.created_at ? this.state.article.created_at.split('T')[1].split('.')[0] : 'loading....'}`}</li>
                                    <li>{`Date: ${this.state.article.created_at ? this.state.article.created_at.split('T')[0] : 'loading....'}`}</li>

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