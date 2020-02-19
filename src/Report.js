import React from "react";
import axios from "axios";

class Report extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit} method="POST">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>
                <div>
                    <label htmlFor="Email">Email</label>
                    <input type="text" id="email" />
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea id="message"></textarea>
                </div>
            <button type="submit">Submit</button>
            </form>
        )
    }
}

export default Report;