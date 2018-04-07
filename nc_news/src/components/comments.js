import React, { Component } from 'react';
import { BrowserRouter, Route , Switch, Link} from 'react-router-dom'


class Comments extends Component {

    state = {
        comments: []
    }


    componentWillMount() {

        

    

        fetch(`https://northcoders-sprints-api.now.sh/api/news/articles/${this.props.match.params.article_id}/comments`)
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
        console.log(this.props)
        return (
            <div>
                <div>

                    <h1>article info</h1>
                </div>



                <div className="comments" class="container" style={{"width":"800px"}}>
                    {
                        this.state.comments.map(comment => {
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
                                            <li>{comment.created_by}</li>
                                            <li><time datetime="2016-1-1">{comment.created_at}</time></li>

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

                <div className="userFrom" class="container" style={{"width":"400px"}}>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Text input" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Username</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-success" type="text" placeholder="Text input" value="bulma" />
                            <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                        <p class="help is-success">This username is available</p>
                    </div>

                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-danger" type="email" placeholder="Email input" value="hello@" />
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>
                        <p class="help is-danger">This email is invalid</p>
                    </div>

                    <div class="field">
                        <label class="label">Subject</label>
                        <div class="control">
                            <div class="select">
                                <select>
                                    <option>Select dropdown</option>
                                    <option>With options</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Message</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Textarea"></textarea>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" />
                                I agree to the <a href="#">terms and conditions</a>
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="question" />
                                Yes
    </label>
                            <label class="radio">
                                <input type="radio" name="question" />
                                No
    </label>
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link">Submit</button>
                        </div>
                        <div class="control">
                            <button class="button is-text">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comments