import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import BlogPost from './blogPost'


class BlogFeed extends Component {

    state = {
        blogPosts: []
    }


    componentDidMount() {
      
        fetch(`https://northcoders-sprints-api.now.sh/api/news/${this.props.endPoint}?page=${this.props.pageNum}`)
            .then(res => {
                return res.json();
            })
            .then(body => {

                this.setState({

                    blogPosts: body.articles

                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentWillReceiveProps(nextprops) {

        fetch(`https://northcoders-sprints-api.now.sh/api/news/${nextprops.endPoint}?page=${nextprops.pageNum}`)
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

                    blogPosts: body.articles

                })
            })
            .catch(err => {
                console.log(err)
            })


    }

    articleVote = (postId,vote) => {
        fetch(`https://northcoders-sprints-api.now.sh/api/news/articles/${postId}?vote=${vote}`, {

            method: "PUT",
            // body: JSON.stringify(`vote=${this.vote}`),
            // headers: new Headers({
            //     'Content-Type': 'application/json'
            //   }),
            type:'cors'


        })
            .then(res => {
                
                return res.json();
            })
            .then(body => {
               
                
                let newState = this.state.blogPosts.map( (article,i)=>{
                   
                    if(article._id === body.article._id) return body.article
                    else return article
                })

                

                this.setState({

                    blogPosts: newState

                })
            })
            .catch(err => {
                console.log(err)
            })

    }




    render() {
        return (
            <div >
                <div class="container" style={{ "width": "1000px" }}>
                

                    {this.state.blogPosts.sort((a,b)=>{
                        return b.votes-a.votes
                    }).map(post => {

                        return <BlogPost postId={post._id} author={post.created_by} 
                        title={post.title} date={post.created_at} votes={post.votes}
                         comments={post.comments} vote={this.articleVote} slug={post.belongs_to}/>

                    })}
                </div>
            </div>
        );
    }

}

export default withRouter(BlogFeed)

