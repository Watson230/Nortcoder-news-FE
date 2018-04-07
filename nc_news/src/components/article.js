import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Comments from './comments'

class Article extends Component {

    state = {

        article: {}

    }

    componentDidMount() {

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
            console.log(this.state)

        return (
            <div>

                <h1 class="title">{this.state.article.title}</h1>
                <h2 class="subtitle"><Link to={"/topics"}>{`# ${this.state.article.belongs_to}`}</Link></h2>
                <p>{this.state.article.body}</p>

                <ul>
                    <li>{`Created_By: ${this.state.article.created_by}`}</li>
                        <li>{this.state.article.created_at}</li>
                            
                        </ul>

                      
                

             
            </div>
                )
        
            }
        
        
        }
        
export default Article