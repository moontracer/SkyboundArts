import React from "react";
import axios from "axios";
import { 
    charlotta
 } from "./charImages";
import { PlusCircle, Menu } from "react-feather";

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
            updatedResults: [],
            videos: [],
            playersQuery: [],
            charactersQuery: [],
            tagsQuery: null,
            eventsQuery: [],
            videoIDs: [],
            searchTags: [],
            tempTags: [],
            noResults: false
        }
        this.updateSearch = this.updateSearch.bind(this);
        this.startSearch = this.startSearch.bind(this);
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
            loading: !this.state.loading,
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
                this.setState({
                    tempResults: [],
                    noResults: true
                })
            }
            if (this.state.tempResults.length > 0){
            this.setState({
                noResults: false,
                updatedResults: Array.from(new Set(this.state.tempResults))
            })
            }
            else if (this.state.tempResults.length == 0) {
                this.setState({
                    noResults: true
                },
                () => {
                    console.log("Invalid search. Please try again.")
                })
            }
        }, 200);
        })
    }
    findPlayers(){
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
    findCharacters(){
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
    findTags(){
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
    findEvents(){
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
    startSearch(e){
        //initial variables for axios string
        //axios.get("http://localhost:5000/api/videos/search/")
        //temporary array created to fetch values from the set
        //var newArr = Array.from(this.state.updatedResults);
        var searchItem = e.target.innerText;
        //console.log(e.target.innerText);
        //quick check if it's a player
        Object.keys(this.state.players).map((player) => {
            if (this.state.players[player].playerName == searchItem){
                this.searchOptions(this.state.players[player].playerName, "", "");
            }
        })
       //quick check if it's a character
        Object.keys(this.state.characters).map((character) => {
            if (this.state.characters[character].characterName == searchItem){
                this.searchOptions("", this.state.characters[character].characterName, "");
            }
        })
        //quick check if it's a tag
        Object.keys(this.state.tags).map((tag) => {
            if(this.state.tags[tag].tagName == searchItem){
                //Haven't checked for existing IDs with tags yet
                this.setState({tagsQuery: this.state.tags[tag].tagId},
                () => {
                    this.tagSearch();
                })
            }
        })
        //quick check if it's an event
        Object.keys(this.state.events).map((event) => {
            if (this.state.events[event].eventName == searchItem){
                this.searchOptions("", "", this.state.events[event].eventName);
            }
        }) 
    }
    async searchOptions(playerName = "", characterName = "", eventName = ""){
        if (this.state.videoIDs.length == 0){
            var videoResponse = await axios.get(`http://localhost:5000/api/videos/search/?playerName=${playerName}&characterName=${characterName}&eventName=${eventName}`);
            this.setState({
                videos: Object.values(videoResponse.data)
            },
            () => {
                console.log(this.state.videos);
                Object.keys(this.state.videos).map((video) => {
                    this.setState({videoIDs: this.state.videos[video].videoId},
                    () => {
                        this.findVideos();
                    })
                })
            })
        }
        else {
            var videoResponse = await axios.get(`http://localhost:5000/api/videos/search/?videoIDs=${this.state.videoIDs}&playerName=${playerName}&characterName=${characterName}&eventName=${eventName}`);
            this.setState({
                videos: Object.values(videoResponse.data)
            },
            () => {
                console.log(this.state.videos);
                Object.keys(this.state.videos).map((video) => {
                    this.setState({videoIDs: this.state.videos[video].videoId},
                    () => {
                        this.findVideos();
                    })
                })
            })
        }        
    }
    async tagSearch(){
        const tagSearchResponse = await axios.get(`http://localhost:5000/api/mapvideotag/search/?searchTagID=${this.state.tagsQuery}`);
        // this.setState({
        //     searchTags: Object.values(tagSearchResponse.data)
        // },
        // () => {
        //     //console.log(this.state.searchTags);
        //     // Object.keys(this.state.searchTags).map((tag) => {
        //     //     this.setState({videoIDs: this.state.searchTags[tag].videoId})
        //     // },
        //     // () => {
        //     //     console.log(this.state.videoIDs);
        //     // })
        //     //Create a temp search tag array, push all of the videoIDs into it
        //     //then, create a new array and utilize it in setstate of videoIDs
        //     var tempArray = [];
        //     Object.keys(this.state.searchTags).map((tag) => {
        //         tempArray.push(this.state.searchTags[tag].videoId);
        //         //utilize tempArray in setState
        //         console.log(tempArray);
        //     },
        //     () => {
        //     })
        // })
        this.setState({
            searchTags: Object.values(tagSearchResponse.data)
        },
        () => {
            this.setState(state => ({
                tempTags: state.searchTags.map(tag => {
                    return tag.videoId;
                })
            }), () => {
                console.log(this.state.tempTags);
                this.findTagVideos();
            })
        })
    }
    async findTagVideos(){
        const vidResponse = await axios.get(`http://localhost:5000/api/videos/find/?videoIDs=${this.state.tempTags}`);
        this.setState({
            videos: Object.values(vidResponse.data)
        },
        () => {
            console.log(this.state.videos);
        })
    }
    async findVideos(){
        const vidResponse = await axios.get(`http://localhost:5000/api/videos/find/?videoIDs=${this.state.videoIDs}`);
        this.setState({
            videos: Object.values(vidResponse.data)
        },
        () => {
            console.log(this.state.videos);
        })
    }
    render(){
        const playableCharacters = ["Charlotta", "Ferry", "Gran", "Katalina", "Ladiva", "Lancelot", "Lowain", "Metera", "Percival", "Vaseraga", "Zeta"]
        return (
            <div>
                <nav>
                    <a className="navLink" href="https://google.com">SKYBOUND ARTS</a>
                    <PlusCircle />
                    <a className="navLink" href="http://forums.skyboundarts.com">FORUMS</a>
                    <Menu />
                </nav>
                <div id="imgHeadContainer">
                    <p id="matchFinderText">Match Finder</p>
                </div>
                {/* <h1>SKYBOUND ARTS</h1> */}
                {/* Search Input */}
                <div className="searchContainer">
                <input id="homeSearch" type = "text" placeholder="Type in a player, character, event, or tag!" onChange={this.updateSearch} />
                </div>
                <div>
                <ul>
                    {
                        this.state.noResults ? 
                        <li id="showNoResults">No Results Found</li> :
                        this.state.updatedResults.map(result => (
                            <li className="showResults" key={result} onClick={this.startSearch}>{result}</li>
                        ))
                    }
                </ul>
                <img src={charlotta} />
                </div>
                    {
                        Object.keys(this.state.videos).map((video, index) => {
                            return (
                            <div key={index}>
                            <p>{this.state.videos[video].eventName}</p>
                            <p>{this.state.videos[video].p1Character}</p>
                            <p>{this.state.videos[video].p2Character}</p>
                            {/* Won't be in final CSS but here for testing */}
                            <p>{this.state.videos[video].winnerCharacter}</p>
                            <p>{this.state.videos[video].p1Player}</p>
                            <p>{this.state.videos[video].p2Player}</p>
                            {/* Won't be in final CSS but here for testing */}
                            <p>{this.state.videos[video].winnerPlayer}</p>
                            <a href={this.state.videos[video].videoLink}>VOD</a>
                            </div>
                            );
                        })
                    }
            </div>
        )
    }
}

export default APITest;