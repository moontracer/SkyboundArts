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
    // axios({
    //     "method": "POST",
    //     "url": "http://localhost:4000/send",
    //     "data": {
    //         "name": name,
    //         "email": email,
    //         "message": message
    //     }
    // }).then((response)=> {
    //     if(response.data.msg === 'success'){
    //         alert("Message Sent.");
    //         this.resetForm()
    //     } else if (response.data.msg === 'fail'){
    //         alert("Message failed to send.")
    //     }
    // })
    // axios.post("http://localhost:4000/send", {
    // })
    // .then(function(response){
    //     console.log(response);
    // })
    // .cach (function(error){
    //     console.log(error);
    // })
    // WORKING AXIOS CALL!!
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
        document.getElementById('mailForm').reset();
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