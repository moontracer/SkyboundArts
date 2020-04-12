import React from "react";
import { PlusCircle} from "react-feather";
import { Link } from "react-router-dom";

// Homepage class
class SkyboundHome extends React.Component {
    render(){
        return (
            <div>
                <nav>
                    <Link className="navLink" to="/">SKYBOUND ARTS</Link>
                    <Link to="/add"><PlusCircle color="white" /></Link>
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