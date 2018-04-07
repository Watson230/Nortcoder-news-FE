import React, { Component } from 'react';
import BlogFeed from './blogFeed'
import BlogPost from './blogPost'

class TopicFeed extends Component {

    state = {
        topics: [],
        currentTopic: ''
    }


    componentWillMount() {
        
        fetch(`https://northcoders-sprints-api.now.sh/api/news/topics`)
            .then(res => {

                return res.json();
            })
            .then(body => {

                this.setState({

                    topics: body.topics,
                    currentTopic: body.topics[0].slug

                })
            })
            .catch(err => {
                console.log(err)

            })
    }

    topicChangeHandler=(slug)=>{
  
        this.setState({
            currentTopic: slug

        })
        

    }


    render() {


        return (
            <div>
                <p class="title is-1 ">Northcoder News Topics</p>
                <div class="tabs">
                    <ul>
                        {this.state.topics.map(topic => {

                            return <li class="is-active"
                                onClick={()=>{

                                    this.topicChangeHandler(topic.slug)}

                                }
                                    
                            ><a>{topic.name}</a></li>
                        })}
                      

                    </ul>

                </div>


                <div>
                    <BlogFeed endPoint={`topics/${this.state.currentTopic}/articles`} pageNum={0} />
                </div>



            </div>
        )
    }
}

export default TopicFeed