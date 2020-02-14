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
            tempResults: [],
            updatedResults: []
        }
        this.updateSearch = this.updateSearch.bind(this);
        this.runAPISearch = this.runAPISearch.bind(this);
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
            setTimeout(() =>{
            this.findPlayers();
            this.findCharacters();
            this.findTags();
            this.findEvents();
            if (this.state.search.length < 2){
                console.log("No Results");
                this.setState({tempResults: []})
            }
            this.setState({updatedResults: Array.from(new Set(this.state.tempResults))})
        }, 1000);
        })
    }
    findPlayers(){
        if (this.state.search.length >= 2){
            Object.keys(this.state.players).map((player) => {
                var finalResult = this.state.players[player].playerName;
                var possibleResult = this.state.players[player].playerName.substring(0, this.state.search.length);
                //lowercasing both the state and the result
                this.setState({
                    search: this.state.search.toLocaleLowerCase()
                }, () => {
                    possibleResult = possibleResult.toLocaleLowerCase();
                    if (possibleResult == this.state.search){
                        this.setState({tempResults: this.state.tempResults.concat(finalResult)})
                    }
                    })
            })
        }
    }
    findCharacters(){
        if (this.state.search.length >= 2) {
            Object.keys(this.state.characters).map((character) => {
            var finalResult = this.state.characters[character].characterName;
            var possibleResult = this.state.characters[character].characterName.substring(0, this.state.search.length);
            //lowercasing both the state and the result
            this.setState({
                search: this.state.search.toLocaleLowerCase()
            }, () => {
                possibleResult = possibleResult.toLocaleLowerCase();
                if (possibleResult == this.state.search){
                    this.setState({tempResults: this.state.tempResults.concat(finalResult)})
                }
            })
            })
        }
    }
    findTags(){
        if(this.state.search.length >= 2){
            Object.keys(this.state.tags).map((tag) => {
                var finalResult = this.state.tags[tag].tagName;
                var possibleResult = this.state.tags[tag].tagName.substring(0, this.state.search.length);
                //lowercasing both the state and the result
                this.setState({
                    search: this.state.search.toLocaleLowerCase()
                }, () => {
                    possibleResult = possibleResult.toLocaleLowerCase();
                    if (possibleResult == this.state.search){
                        this.setState({tempResults: this.state.tempResults.concat(finalResult)})
                    }
                })
            })
        }
    }
    findEvents(){
        if(this.state.search.length >= 2){
            Object.keys(this.state.events).map((event) => {
                var finalResult = this.state.events[event].eventName;
                var possibleResult = this.state.events[event].eventName.substring(0, this.state.search.length);
                //lowercasing both the state and the result
                this.setState({
                    search: this.state.search.toLocaleLowerCase()
                }, () => {
                    possibleResult = possibleResult.toLocaleLowerCase();
                    if (possibleResult == this.state.search){
                        this.setState({tempResults: this.state.tempResults.concat(finalResult)})
                    }
                })
            })
        }
    }
    runAPISearch(){

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
                    { /*
                        Object.keys(this.state.characters).map((character, index) => {
                        return (
                        <p key={index}>{this.state.characters[character].characterName}</p>
                        );
                        })
                        */
                    }
                </div>
                {/* Players */}
                <div>
                    { /*
                        Object.keys(this.state.players).map((player, index) => {
                            return (
                                <p key={index}>{this.state.players[player].playerName}</p>
                            );
                        })
                        */
                    }
                </div>
                {/* Events */}
                <div>
                    {
                        /*
                        Object.keys(this.state.events).map((event, index) => {
                            return (
                            <p key={index}>{this.state.events[event].eventName}</p>
                            );
                        })
                        */
                    }
                </div>
                {/* Tags */}
                <div>
                    {
                        /*
                        Object.keys(this.state.tags).map((tag, index) => {
                            return (
                            <p key={index}>{this.state.tags[tag].tagName}</p>
                            );
                        })
                        */
                    }
                </div>
                {/* Search Input */}
                <input type = "text" placeholder="Placeholder Search" onChange={this.updateSearch} />
                <div>
                <ul>
                    {
                        this.state.updatedResults.map(result => (
                            <li key={result}>{result}</li>
                        ))
                    }
                </ul>
                </div>
            </div>
        )
    }
}

export default APITest;