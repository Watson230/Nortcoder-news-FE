import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import BlogPost from './blogPost'

const API_URL = `https://damp-everglades-92072.herokuapp.com/api`


class BlogFeed extends Component {

    state = {
        blogPosts: []
    }


    componentDidMount() {

        fetch(`${API_URL}/${this.props.endPoint}`)
            .then(res => {
                return res.json();
            })
            .then(body => {

                this.setState({

                    blogPosts: body

                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentWillReceiveProps(nextprops) {

        fetch(`${API_URL}/${nextprops.endPoint}`)
            .then(res => {

                if (res.status === 404) {
                    throw new Error('Content does not exist')
                }
                return res.json();
            })
            .then(body => {

                if (body.count === 0) {
                    // throw new Error('Content does not exist')

                    this.props.history.push('/404')
                }
                else this.setState({

                    blogPosts: body

                })
            })
            .catch(err => {
                console.log(err)
            })
    }




    articleVote = (postId, vote) => {
        let newState
        if (vote === 'up') {
            newState = this.state.blogPosts.map((article, i) => {
               
                if (article._id === postId) {
                    
                    article.votes++
                   
                    return article
                }
                else return article
            })

        }

        if (vote === 'down') {
            newState = this.state.blogPosts.map((article, i) => {

                if (article._id === postId) {
                    article.votes = article.votes - 1
                    return article
                }
                else return article
            })


        }
        this.setState({
            blogPosts: newState
        }, )

       
        fetch(`${API_URL}/articles/${postId}?vote=${vote}`, {

            method: "PUT",
            type: 'cors'


        })
            .then(res => {

                return res.json();
            })
            .then(body => {
                console.log(body)



            }).catch(err => {
                console.log(err)
            })
    }




    render() {
        return (
            <div >


                <div class="box" style={{ "width": "100%" }}>


                    {this.state.blogPosts.sort((a, b) => {
                        return b.votes - a.votes
                    }).map((post, i) => {

                        return <div><BlogPost postId={post._id} author={post.created_by}
                            title={post.title} date={post.created_at} votes={post.votes}
                            comments={post.comments} vote={this.articleVote} slug={post.belongs_to} />
                        </div>

                    })}
                </div>
            </div>
        );
    }

}

export default withRouter(BlogFeed)

