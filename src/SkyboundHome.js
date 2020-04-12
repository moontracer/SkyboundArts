import React from "react";
import { PlusCircle} from "react-feather";

// Homepage class
class SkyboundHome extends React.Component {
    render(){
        return (
            <div>
                <nav>
                    <a className="navLink" href="https://google.com">SKYBOUND ARTS</a>
                    <PlusCircle color="white" />
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