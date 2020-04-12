import React from "react";
import axios from "axios";

class Report extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
    e.preventDefault();
    // Retrieving the innerHTML contents before sending them in an axios post. After the post is sent, the contents of the form are reset.
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    axios.post("http://localhost:4000/send", {
        name: name.value,
        email: email.value,
        message: message.value
    })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    })
    console.log(message.value);
    }
    resetForm(){
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit} method="POST" id="mailForm">
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