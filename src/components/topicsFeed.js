import React, { Component } from 'react';
import BlogFeed from './blogFeed'
import BlogPost from './blogPost'
import NavBar from './navbar'
import {getTopics} from '../api'
const API_URL= `https://damp-everglades-92072.herokuapp.com/api`


class TopicFeed extends Component {

    state = {
        topics: [],
        currentTopic: '',
        loaded: false,
        coding: "is-active",
        cooking: "",
        football: ''

    }


    componentDidMount() {
            getTopics()
            .then(body => {

                this.setState({

                    topics: body,
                    currentTopic: body[0].slug,
                    loaded: true

                })
            })
            .catch(err => {
                console.log(err)

            })
    }

    tabChangerHandeler = (activeTab) => {

        const newState = {
            topics: this.state.topics,
            currentTopic: activeTab,
            loaded: true,
            coding: '',
            cooking: '',
            football: ''
        }

        if (activeTab === 'coding') {
            newState.coding = "is-active";
        }
        if (activeTab === 'cooking') {
            newState.cooking = "is-active";
        }

        if (activeTab === 'football') {
            newState.football = "is-active";
        }

        this.setState(newState);
    }


    render() {

        if (!this.state.loaded) return null

        return (
            <div>
                <NavBar tab={'topics'} />
                <div className="container">
                    <div className="notification" style={{ "text-aline": "center" }}>
                        <p className="title is-3 ">Northcoder News Topics</p>
                    </div>
                </div>

                <div className="tabs is-centered">
                    <ul>
                        {this.state.topics.map(topic => {

                            return <li className={this.state[topic.slug]}
                                onClick={() => {
                                    this.tabChangerHandeler(topic.slug)
                                }}
                            ><a>{topic.title}</a></li>
                        })}
                    </ul>
                </div>

                <div className="container">
                    <BlogFeed endPoint={`topics/${this.state.currentTopic}/articles`}/>
                </div>

            </div>
        )
    }
}








export default TopicFeed