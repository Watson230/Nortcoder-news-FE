import React, { Component } from 'react';
import BlogFeed from './blogFeed'
import BlogPost from './blogPost'
import NavBar from './navbar'

class TopicFeed extends Component {

    state = {
        topics: [],
        currentTopic: '',
        pageNum: 0
    }


    componentDidMount() {

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

    componentWillReceiveProps(nextProps) {

        fetch(`https://northcoders-sprints-api.now.sh/api/news/topics`)
            .then(res => {

                return res.json();
            })
            .then(body => {

                this.setState({

                    topics: body.topics,
                    currentTopic: this.state.currentTopic

                })
            })
            .catch(err => {
                console.log(err)

            })
    }


    topicChangeHandler = (slug) => {

        this.setState({
            currentTopic: slug,
            pageNum: 0
        })
    }

    pageChangeHandler = () => {

        this.setState({
            pageNum: this.state.pageNum + 1,
            topics: this.state.topics,
            currentTopic: this.state.currentTopic
        })


    }


    render() {


        return (
            <div>
                <NavBar />
                <div class="container">
                    <div class="notification" style={{ "text-aline": "center" }}>
                        <p class="title is-3 ">Northcoder News Topics</p>
                    </div>
                </div>

                <div class="tabs is-centered">
                    <ul>
                        {this.state.topics.map(topic => {

                            return <li class="is-active"
                                onClick={() => {

                                    this.topicChangeHandler(topic.slug)
                                }

                                }

                            ><a>{topic.name}</a></li>
                        })}


                    </ul>

                </div>


                <div class="container">
                    {/* <Feed currentTopic ={this.state.currentTopic} pageNum={this.state.pageNum} pageChangeHandler={this.pageChangeHandler}/> */}

                    {/* <div style={{"margin":"auto"}}> <button class="button is-medium" onClick={this.pageChangeHandler}>Prev Page</button>   <button class="button is-medium" onClick={this.pageChangeHandler}> Next Page</button></div> */}

                    <div style={{ "text-align": "center" }}>
                        <div class="container" style={{ "width": "1000px", "text-align": "center" ,"margin-bottom":"20px"}}>
                            <button class="button is-medium" onClick={this.pageChangeHandler} style={{ "margin-right": "20px" }} >Prev Page</button>

                            <span class="title is-4"> {`Page ${parseInt(this.state.pageNum) + 1}`}</span>

                            <button class="button is-medium" onClick={this.pageChangeHandler} style={{ "margin-left": "20px" }} >Next Page</button>
                        </div>
                    </div>

                    <BlogFeed endPoint={`topics/${this.state.currentTopic}/articles`} pageNum={this.state.pageNum} />

                    <div style={{ "text-align": "center" , "margin-top":"20px","margin-bottom":"20px"}}>
                        <div class="container" style={{ "width": "1000px", "text-align": "center" }}>
                            <button class="button is-medium" onClick={this.pageChangeHandler} style={{ "margin-right": "20px" }} >Prev Page</button>

                            <span class="title is-4"> {`Page ${parseInt(this.state.pageNum) + 1}`}</span>

                            <button class="button is-medium" onClick={this.pageChangeHandler} style={{ "margin-left": "20px" }} >Next Page</button>
                        </div>
                    </div>
                </div>



            </div>
        )
    }
}

const Feed = (props) => {
    let pageNumber = props.pageNumber


    return (
        <div>


            <div>
                <button>Prev Page</button>
                <h2> {`Page ${pageNumber}`}</h2>
                <button
                    onClick={props.pageChangeHandler}
                >Next Page</button>
                <BlogFeed endPoint={`topics/${props.currentTopic}/articles`} pageNum={pageNumber} />
            </div>
        </div>
    )


}



export default TopicFeed