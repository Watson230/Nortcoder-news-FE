import React, { Component } from 'react';

const API_URL = `https://damp-everglades-92072.herokuapp.com/api`

class AddCommentModal extends Component {

    state = {
        newComment: '',
        articleId: this.props.articleId

    }
    

    commentInputHandler = (event) => {

        this.setState({

          
            newComment: event.target.value,
            articleId: this.props.articleId


        })
    }

    addNewComment = () => {

        let commentPost = { comment: this.state.newComment }
        fetch(`${API_URL}/articles/${this.state.articleId}/comments`, {

            method: 'POST',
            body: JSON.stringify(commentPost),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            type: 'cors'

        }).then(res => res.json())

            .then(comment => console.log(comment))

            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log(this.props)
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">

                    <header className="modal-card-head">
                        <p className="modal-card-title">Add Comment</p>
                        <button onClick={() => { this.props.addCommentButtonHandler(0) }} className="delete" aria-label="close"></button>
                    </header>

                    <section className="modal-card-body">
                        {<div className="field">
                            <label className="label">Comment</label>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Text input" value={'northcoder'} />
                                </div>
                            </div>
                            <div className="control">
                                <textarea className="input" className="textarea" placeholder="Textarea" value={`${this.state.newComment}`} onChange={event => {
                                    console.log(event.target.value)
                                    this.commentInputHandler(event)
                                }}></textarea>
                            </div>
                        </div>}
                    </section>

                    <footer className="modal-card-foot">
                        <button className="button is-success"
                            onClick={() => {
                                this.addNewComment();
                                this.props.addCommentButtonHandler(0);

                            }}

                        >Submit</button>
                        <button className="button"
                            onClick={() => { this.props.addCommentButtonHandler(0) }}

                        >Cancel</button>
                    </footer>

                </div>
            </div>
        )
    }
}

export default AddCommentModal
