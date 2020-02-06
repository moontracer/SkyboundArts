import React from "react";
import axios from "axios";

class APITest extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            players: {},
            characters: {},
            tags: {},
            events: {},
            loading: true
        }
    }
    async componentDidMount(){
        const [playerResponse, characterResponse, tagResponse, eventResponse] = await Promise.all([
            axios.get("http://localhost:5000/api/players/"),
            axios.get("http://localhost:5000/api/characters/"),
            axios.get("http://localhost:5000/api/videotags/"),
            axios.get("http://localhost:5000/api/events/")
        ]);
        this.setState({
            players: playerResponse.data,
            characters: characterResponse.data,
            tags: tagResponse.data,
            events: eventResponse.data,
            loading: !this.state.loading
        }, () => {
            console.log(this.state.players);
            console.log(this.state.characters);
            console.log(this.state.tags);
            console.log(this.state.events);
        })
    }
    render(){
        return (
            <div>
            </div>
        )
    }
}

export default APITest;