import React from "react";
import { ArrowLeft } from "react-feather";
import { Link } from "react-router-dom";

class Help extends React.Component {
    render(){
        return (
            <div>
                <h1 id="helpHeader">Help</h1>
                <h2 className="helpQuestion">How do I use Skybound Arts?</h2>
                    <div className="helpContainer">
                    <span>By inputting <strong>any</strong> of the following:</span>
                    <ul>
                        <li>A Granblue Fantasy Versus character</li>
                        <li>A competitive Granblue Fantasy Versus player</li>
                        <li>Fighting game community events that have featured Granblue Fantasy Versus</li>
                        <li>Tags which describe outcomes that happen in a match such as a <i>Perfect</i> (full tag list will be uploaded in the future!)</li>
                    </ul>
                    <p id="helpSubtext">You'll be able to search our match database for the footage that you seek! For those who are unfamiliar with 
                          Granblue Fantasy Versus as a whole, feel free to type in <i>La</i> into the home page's search bar to get a feel for how
                          the site finds results. Lancelot, Ladiva and any fighting game event titles starting with La will appear in the results. The results will
                          update as long as you keep typing!
                    </p>
                    <Link to="/"><ArrowLeft color="#4D97E4" size={30} /></Link>
                    </div>
            </div>
        )
    }
}

export default Help;