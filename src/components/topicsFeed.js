import React, { Component } from 'react';
import BlogFeed from './blogFeed'
import BlogPost from './blogPost'
import NavBar from './navbar'

class TopicFeed extends Component {

    state = {
        topics: [],
        currentTopic: '',
        loaded:false,
        coding:"is-active",
        cooking:"",
        football:''

    }


    componentDidMount() {

        fetch(`http://localhost:4000/api/topics`)
            .then(res => {

                return res.json();
            })
            .then(body => {

                this.setState({

                    topics: body,
                    currentTopic: body[0].slug,
                    loaded:true

                })
            })
            .catch(err => {
                console.log(err)

            })
    }

   


  

    tabChangerHandeler =(activeTab)=>{
        if(activeTab === 'coding'){

            this.setState({
                topics:this.state.topics,
                currentTopic: activeTab,
                loaded:true,
                coding:"is-active",
                cooking:'',
                football:''


            })
        }
        if(activeTab === 'cooking'){

            this.setState({
                topics:this.state.topics,
                currentTopic: activeTab,
                loaded:true,
                coding:"",
                cooking:"is-active",
                football:''


            })
        }

        if(activeTab === 'football'){

            this.setState({
                topics:this.state.topics,
                currentTopic: activeTab,
                loaded:true,
                coding:"",
                cooking:"",
                football:"is-active"


            })
        }

    }


    render() {

        if(!this.state.loaded) return null

        return (
            <div>
                <NavBar tab={'topics'}/>
                <div class="container">
                    <div class="notification" style={{ "text-aline": "center" }}>
                        <p class="title is-3 ">Northcoder News Topics</p>
                    </div>
                </div>

                <div class="tabs is-centered">
                    <ul>
                        {this.state.topics.map(topic => {
                            console.log(topic)
                            return <li class={this.state[topic.slug]}
                                onClick={() => {

                                    
                                    this.tabChangerHandeler(topic.slug)
                                }
                                }
                            ><a>{topic.title}</a></li>
                        })}
                    </ul>

                </div>


                <div class="container">
                    {/* <Feed currentTopic ={this.state.currentTopic} pageNum={this.state.pageNum} pageChangeHandler={this.pageChangeHandler}/> */}

                    {/* <div style={{"margin":"auto"}}> <button class="button is-medium" onClick={this.pageChangeHandler}>Prev Page</button>   <button class="button is-medium" onClick={this.pageChangeHandler}> Next Page</button></div> */}

                  

                            
                    <BlogFeed endPoint={`topics/${this.state.currentTopic}/articles`} />

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