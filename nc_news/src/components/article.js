import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Comments from './comments'
import NavBar from './navbar'

class Article extends Component {

    state = {

        article: {},


    }

    componentWillMount() {

        console.log(this.props.match.params)
        fetch(`http://localhost:4000/api/articles/${this.props.match.params.postId}`)
            .then(res => {
                console.log(res)
                // if(res.status ===  404 ){
                //     throw new Error('Content does not exist')
                // }
                return res.json();
            })
            .then(body => {
                console.log(body)
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
                    <NavBar/>

                    <div className ="article NavButtons" style={{ "text-align": "center" }}>
                        <div class="container" style={{ "width": "1000px", "text-align": "center" ,"margin-bottom":"20px"}}>
                            <button class="button is-medium" onClick={this.pageChangeHandler} style={{ "margin-right": "20px" }} >Prev Article</button>


                            <button class="button is-medium" onClick={this.pageChangeHandler} style={{ "margin-left": "20px" }} >Next Article</button>
                        </div>
                    </div>

                <div class="card" style={{"margin-bottom":"20px"}}>
                <header class="card-header">
                <div>
                <div>
                    <p className="card-header-title" className="title is-1">
                        {this.state.article.title}
                    </p>
                    </div>
                    <div>
                    <h2 class="subtitle is-3"><Link to={"/topics"}>{`# ${this.state.article.belongs_to}`}</Link></h2>
                    </div>
                    </div>
                </header>
                <div class="card-content">
                    <div class="content">
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