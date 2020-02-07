import React from "react";
import axios from "axios";

class APITest extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            players: [],
            characters: [],
            tags: [],
            events: [],
            loading: true,
            search: "",
            results: []
        }
        this.updateSearch = this.updateSearch.bind(this);
    }
    async componentDidMount(){
        const [playerResponse, characterResponse, tagResponse, eventResponse] = await Promise.all([
            axios.get("http://localhost:5000/api/players/"),
            axios.get("http://localhost:5000/api/characters/"),
            axios.get("http://localhost:5000/api/videotags/"),
            axios.get("http://localhost:5000/api/events/")
        ]);
        this.setState({
            players: Object.values(playerResponse.data),
            characters: Object.values(characterResponse.data),
            tags: Object.values(tagResponse.data),
            events: Object.values(eventResponse.data),
            loading: !this.state.loading
        }, () => {
            console.log(this.state.players);
            console.log(this.state.characters);
            console.log(this.state.tags);
            console.log(this.state.events);
            console.log(this.state.loading);
        })
    }
    updateSearch(e){
        this.setState({
            search: e.target.value
        },
        () => {
            this.findResults();
        })
    }
    findResults(){
        // Object.keys(this.state.characters.map((character, index) => {
        //   if(this.state.characters[character].characterName == this.state.search
        // })
        console.log(this.state.search);
    }
    render(){
        return (
            <div>
                {/* Map calls a function on every array element, taking said function in as a parameter.
                 It also creates a new array instead of overwriting data! 
                 Characters - represents entire array
                 character - represent array element
                */}
                {/* Characters */}
                <div>
                    {
                        Object.keys(this.state.characters).map((character, index) => {
                        return (
                        <p key={index}>{this.state.characters[character].characterName}</p>
                        );
                        })
                    }
                </div>
                {/* Players */}
                <div>
                    {
                        Object.keys(this.state.players).map((player, index) => {
                            return (
                                <p key={index}>{this.state.players[player].playerName}</p>
                            );
                        })
                    }
                </div>
                {/* Events */}
                <div>
                    {
                        Object.keys(this.state.events).map((event, index) => {
                            return (
                            <p key={index}>{this.state.events[event].eventName}</p>
                            );
                        })
                    }
                </div>
                {/* Tags */}
                <div>
                    {
                        Object.keys(this.state.tags).map((tag, index) => {
                            return (
                            <p key={index}>{this.state.tags[tag].tagName}</p>
                            );
                        })
                    }
                </div>
                {/* Search Input */}
                <input type = "text" placeholder="Placeholder Search" onChange={this.updateSearch} />
            </div>
        )
    }
}

export default APITest;