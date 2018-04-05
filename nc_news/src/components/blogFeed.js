import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import BlogPost from './blogPost'


class BlogFeed extends Component {

    state = {
        blogPosts: []
    }


    componentDidMount() {
        console.log(this.props)
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
                console.log(res)
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




    render() {
        return (
            <div >
                <div style={{ "width": "1000px" }}>

                    {this.state.blogPosts.map(post => {

                        return <BlogPost postId={post._id} author={post.created_by} title={post.title} date={post.created_at} votes={post.votes} comments={post.comments}/>

                    })}
                </div>
            </div>
        );
    }

}

export default withRouter(BlogFeed)

