import React from "react";
import axios from "axios";
import { PlusCircle, PlayCircle } from "react-feather";
import * as CharImgs from "./charImages";

// Homepage class
class SkyboundHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //containers for all the database values which are used as search queries
            players: [],
            characters: [],
            tags: [],
            events: [],
            //boolean that tracks the status of the initial get requests
            loading: true,
            //state variables used to hold and display the results retrieved from searches
            search: "",
            tempResults: [],
            updatedResults: [],
            //array of objects that holds all the videos from the searches
            videos: [],
            //secondary containers for search queries
            playersQuery: [],
            charactersQuery: [],
            tagsQuery: null,
            eventsQuery: [],
            //holds all the video IDs which are stored when a search is conducted
            videoIDs: [],
            searchTags: [],
            tempTags: [],
            //controls whether or not results are / aren't displayed depending on if the search produced results
            noResults: false
        }
        this.updateSearch = this.updateSearch.bind(this);
        this.startSearch = this.startSearch.bind(this);
    }
    async componentDidMount(){
        //on componentMount, get all the players, characters, videos, and tags from the database. Once they are retrieved, load the page.
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
            //Updates value when search is conducted
            search: e.target.value
        },
        () => {
            setTimeout(() =>{
            //Sees if search result is a character, player, tag, or event.
            this.findPlayers();
            this.findCharacters();
            this.findTags();
            this.findEvents();
            //if there's less than 2 letters inserted in the searchbar, no results will be shown.
            if (this.state.search.length < 2){
                console.log("No Results");
                this.setState({
                    tempResults: [],
                    noResults: true
                })
            }
            //Valid search
            if (this.state.tempResults.length > 0){
            this.setState({
                noResults: false,
                updatedResults: Array.from(new Set(this.state.tempResults))
            })
            }
            //No results - search is invalid
            else if (this.state.tempResults.length === 0) {
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
            //Maps through all the players in the database, checking if the entered search result equals a substring from a player entry
            Object.keys(this.state.players).map((player) => {
                var finalResult = this.state.players[player].playerName;
                var possibleResult = this.state.players[player].playerName.substring(0, this.state.search.length);
                //lowercasing both the state and the result
                this.setState({
                    search: this.state.search.toLocaleLowerCase()
                }, () => {
                    possibleResult = possibleResult.toLocaleLowerCase();
                    if (possibleResult === this.state.search){
                        return this.setState({tempResults: this.state.tempResults.concat(finalResult)})
                    }
                    })
                return null;
            })
    }
    findCharacters(){
            //Maps through all the characters in the database, checking if the entered search result equals a substring from a character entry
            Object.keys(this.state.characters).map((character) => {
            var finalResult = this.state.characters[character].characterName;
            var possibleResult = this.state.characters[character].characterName.substring(0, this.state.search.length);
            //lowercasing both the state and the result
            this.setState({
                search: this.state.search.toLocaleLowerCase()
            }, () => {
                possibleResult = possibleResult.toLocaleLowerCase();
                if (possibleResult === this.state.search){
                    return this.setState({tempResults: this.state.tempResults.concat(finalResult)})
                }
            })
                return null;
            })
    }
    findTags(){
                //Maps through all the tags in the database, checking if the entered search result equals a substring from a tag entry
                Object.keys(this.state.tags).map((tag) => {
                var finalResult = this.state.tags[tag].tagName;
                var possibleResult = this.state.tags[tag].tagName.substring(0, this.state.search.length);
                //lowercasing both the state and the result
                this.setState({
                    search: this.state.search.toLocaleLowerCase()
                }, () => {
                    possibleResult = possibleResult.toLocaleLowerCase();
                    if (possibleResult === this.state.search){
                        return this.setState({tempResults: this.state.tempResults.concat(finalResult)})
                    }
                })
                return null;
            })
    }
    findEvents(){
                //Maps through all the events in the database, checking if the entered search result equals a substring from an event entry
                Object.keys(this.state.events).map((event) => {
                var finalResult = this.state.events[event].eventName;
                var possibleResult = this.state.events[event].eventName.substring(0, this.state.search.length);
                //lowercasing both the state and the result
                this.setState({
                    search: this.state.search.toLocaleLowerCase()
                }, () => {
                    possibleResult = possibleResult.toLocaleLowerCase();
                    if (possibleResult === this.state.search){
                        return this.setState({tempResults: this.state.tempResults.concat(finalResult)})
                    }
                })
                return null;
            })
    }
    startSearch(e){
        //Grabbing the innerText of the clicked query item
        var searchItem = e.target.innerText;
        //quick check if it's a player
        Object.keys(this.state.players).map((player) => {
            if (this.state.players[player].playerName === searchItem){
                return this.searchOptions(this.state.players[player].playerName, "", "");
            }
            return null;
        })
       //quick check if it's a character
        Object.keys(this.state.characters).map((character) => {
            if (this.state.characters[character].characterName === searchItem){
                return this.searchOptions("", this.state.characters[character].characterName, "");
            }
            return null;
        })
        //quick check if it's a tag
        Object.keys(this.state.tags).map((tag) => {
            if(this.state.tags[tag].tagName === searchItem){
                //Haven't checked for existing IDs with tags yet
                return this.setState({tagsQuery: this.state.tags[tag].tagId},
                () => {
                    this.tagSearch();
                })
            }
            return null;
        })
        //quick check if it's an event
        Object.keys(this.state.events).map((event) => {
            if (this.state.events[event].eventName === searchItem){
                return this.searchOptions("", "", this.state.events[event].eventName);
            }
            return null;
        }) 
    }
    //Conducts the asynchronous search request. This is performed when a user clicks on a database query (character, player, etc.)
    async searchOptions(playerName = "", characterName = "", eventName = ""){
        //Default search - performed when a search request is first conducted on the site
        if (this.state.videoIDs.length === 0){
            var videoResponse = await axios.get(`http://localhost:5000/api/videos/search/?playerName=${playerName}&characterName=${characterName}&eventName=${eventName}`);
            this.setState({
                videos: Object.values(videoResponse.data)
            },
            () => {
                console.log(this.state.videos);
                Object.keys(this.state.videos).map((video) => {
                    return this.setState({videoIDs: this.state.videos[video].videoId},
                    () => {
                        this.findVideos();
                    })
                })
            })
        }
        else {
            //Search that's conducted when users have already inserted a query which has narrowed down the selection of videos
            videoResponse = await axios.get(`http://localhost:5000/api/videos/search/?videoIDs=${this.state.videoIDs}&playerName=${playerName}&characterName=${characterName}&eventName=${eventName}`);
            this.setState({
                videos: Object.values(videoResponse.data)
            },
            () => {
                console.log(this.state.videos);
                Object.keys(this.state.videos).map((video) => {
                    return this.setState({videoIDs: this.state.videos[video].videoId},
                    () => {
                        this.findVideos();
                    })
                })
            })
        }        
    }
    async tagSearch(){
        //This search is ran when users click on a tag from the database and a query hasn't been performed yet
        const tagSearchResponse = await axios.get(`http://localhost:5000/api/mapvideotag/search/?searchTagID=${this.state.tagsQuery}`);
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
        //This search is done after tagSearch() in order to obtain the IDs of the respective videos that had that tag
        const vidResponse = await axios.get(`http://localhost:5000/api/videos/find/?videoIDs=${this.state.tempTags}`);
        this.setState({
            videos: Object.values(vidResponse.data)
        },
        () => {
            console.log(this.state.videos);
        })
    }
    async findVideos(){
        //This is ran when the user attempts to search for a video by its ID.
        const vidResponse = await axios.get(`http://localhost:5000/api/videos/find/?videoIDs=${this.state.videoIDs}`);
        this.setState({
            videos: Object.values(vidResponse.data)
        },
        () => {
            console.log(this.state.videos);
        })
    }
    render(){
        return (
            <div>
                <nav>
                    <a className="navLink" href="https://google.com">SKYBOUND ARTS</a>
                    <PlusCircle />
                    <a className="navLink" href="http://forums.skyboundarts.com">FORUMS</a>
                    {/* <Menu /> */}
                </nav>
                <div id="imgHeadContainer">
                    <p id="matchFinderText">Match Finder</p>
                </div>
                <div className="searchContainer">
                <input id="homeSearch" type = "text" placeholder="Type in a player, character, event, or tag!" onChange={this.updateSearch} />
                </div>
                <div>
                <ul>
                    {
                        this.state.noResults ? 
                        <li id="showNoResults">No Results Found</li> :
                        this.state.updatedResults.map(result => (
                            <li className="showResults" key={result} onClick={this.startSearch}>
                                <p className="resultData">
                                {result}
                                </p>
                            </li>
                        ))
                    }
                </ul>
                </div>
                    {
                        Object.keys(this.state.videos).map((video, index) => {
                            return (
                            <div key={index}>
                            <p id="vidEventName">{this.state.videos[video].eventName}</p>
                            <div id="videoContainer">
                            <img className="vidImage" src={CharImgs[this.state.videos[video].p1Character]} alt={CharImgs[this.state.videos[video].p1Character]} />
                            <p>{this.state.videos[video].p1Player}</p>
                            <p>VS</p>
                            <img className="vidImage" src={CharImgs[this.state.videos[video].p2Character]} alt={CharImgs[this.state.videos[video].p2Character]} />
                            <p>{this.state.videos[video].p2Player}</p>
                            <a href={this.state.videos[video].videoLink}>
                                <PlayCircle />
                            </a>
                            </div>
                            </div>
                            );
                        })
                    }
            </div>
        )
    }
}

export default SkyboundHome;