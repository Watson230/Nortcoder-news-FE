import React, { Component } from 'react';

class Article extends Component {

    state = {
        article: {
            title: ''
        }
    }

    componentDidMount() {

        console.log(this.props.match.params)
        fetch(`https://northcoders-sprints-api.now.sh/api/news/articles/${this.props.match.params.postId}`)
            .then(res => {
                console.log(res)
                if(res.status ===  404 ){
                    throw new Error('Content does not exist')
                }
                return res.json();
            })
            .then(body => {

                this.setState({

                    article: body.post

                })
            })
            .catch(err => {
                
                console.log(err)
                this.props.history.push('/404')
                
            })
    }
    
    render() {
        console.log(this.props)

        return (
            <div>        
                <h2>{this.props.title}</h2>
                    
                <ul>
                   
                    <li><a>{this.props.article.created_by}</a></li>
                    <li>{this.props.article.created_at}</li>
                </ul>

                <div>
                    <p>{this.props.article.body}</p>
                </div>

                <button onClick={(event)=>{
                    event.preventDefault()
                    window.location ='/'

                }}>Home</button>
            </div>
        )

    }


}

export default Article