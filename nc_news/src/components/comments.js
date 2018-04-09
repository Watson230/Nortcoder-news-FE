import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'


class Comments extends Component {

    state = {
        comments: []
    }


    componentWillMount() {
        let articleId
        if (!this.props.match) articleId = this.props.postId
        else articleId = this.props.match.params.article_id
        fetch(`https://northcoders-sprints-api.now.sh/api/news/articles/${articleId}/comments`)
            .then(res => {
                return res.json();
            })
            .then(body => {
                console.log(body)
                this.setState({
                    comments: body.comments
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {

        return (
            <div>
                <div className="comments" class="container" style={{ "width": "800px" }}>
                    {
                        this.state.comments.sort((a,b)=>{

                            return parseInt(b.created_at) - parseInt(a.created_at)
                        }).map(comment => {
                            return (<div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Comment
                                 </p>
                                    <a href="#" class="card-header-icon" aria-label="more options">
                                        <span class="icon">
                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        {comment.body}
                                        <ul>
                                            <li>{`Made By:${comment.created_by}`}</li>
                                            <li>{`Time: ${comment.created_at.split('T')[1].split('.')[0]}`}</li>
                                             <li>{`Date: ${comment.created_at.split('T')[0]}`}</li>

                                        </ul>

                                        <br />

                                    </div>
                                </div>
                                <footer class="card-footer">
                                    <Link to={`/users/${comment.created_by}`} class="card-footer-item">{`${comment.created_by}'s profile`}</Link>

                                </footer>
                            </div>
                            )
                        })
                    }
                </div>

              
                
            </div>
        )
    }
}

export default Comments