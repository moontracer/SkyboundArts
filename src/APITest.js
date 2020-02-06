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
            console.log(this.state.loading);
        })
    }
    render(){
        var characterNames = [];
        return (
            <div>
                {/* Map calls a function on every array element, taking said function in as a parameter.
                 It also creates a new array instead of overwriting data! 
                 Characters - represents entire array
                 character - represent array element
                */}
                <div>
                {
                    this.state.loading ?
                    <p>Hasn't been loaded yet</p>
                    :
                    Object.keys(this.state.characters).map((character, i) => {
                        characterNames.Push(this.state.characters[character]);
                        // return (
                        //     <p key={i}>{this.state.characters[character]}</p>
                        //     // Why am I not getting the value?
                        // )
                        console.log(characterNames);
                    })
                }
                </div>
            </div>
        )
    }
}

export default APITest;