import React from "react";
import { PlusCircle, HelpCircle} from "react-feather";
import { Link } from "react-router-dom";

// Homepage class
class SkyboundHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            deviceWidth: document.documentElement.clientWidth
        }
    }
    componentDidMount(){
        console.log("The page width is " + this.state.deviceWidth);
    }
    render(){
        return (
            <div className="homeDiv">
                <nav>
                    <Link className="navLink" to="/">SKYBOUND ARTS</Link>
                    <Link to="/add"><PlusCircle color="white" size={30} /></Link>
                    <Link to="/help"><HelpCircle color="white" size={30} /></Link>
                    <a className="navLink" href="http://forums.skyboundarts.com">FORUMS</a>
                    {/* <Menu /> */}
                </nav>
                <div id="imgHeadContainer">
                    <p id="matchFinderText">Match Finder</p>
                </div>
            </div>
        )
    }
}

export default SkyboundHome;