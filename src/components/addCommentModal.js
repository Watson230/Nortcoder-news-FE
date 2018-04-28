import React, { Component } from 'react';


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
        fetch(`http://localhost:4000/api/articles/${this.state.articleId}/comments`, {

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
            <div class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-card">

                    <header class="modal-card-head">
                        <p class="modal-card-title">Add Comment</p>
                        <button onClick={() => { this.props.addCommentButtonHandler(0) }} class="delete" aria-label="close"></button>
                    </header>

                    <section class="modal-card-body">
                        {<div class="field">
                            <label class="label">Comment</label>
                            <div class="field">
                                <label class="label">Name</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Text input" value={'northcoder'} />
                                </div>
                            </div>
                            <div class="control">
                                <textarea class="input" class="textarea" placeholder="Textarea" value={`${this.state.newComment}`} onChange={event => {
                                    console.log(event.target.value)
                                    this.commentInputHandler(event)
                                }}></textarea>
                            </div>
                        </div>}
                    </section>

                    <footer class="modal-card-foot">
                        <button class="button is-success"
                            onClick={() => {
                                this.addNewComment();
                                this.props.addCommentButtonHandler(0);

                            }}

                        >Submit</button>
                        <button class="button"
                            onClick={() => { this.props.addCommentButtonHandler(0) }}

                        >Cancel</button>
                    </footer>

                </div>
            </div>
        )
    }
}

export default AddCommentModal
