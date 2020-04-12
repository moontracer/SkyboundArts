import React from 'react';
import './App.css';
import SkyboundHome from "./SkyboundHome.js";
import SkyboundResults from "./SkyboundResults.js";
import AddVideo from "./AddVideo.js";
import Report from "./Report.js";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <SkyboundHome />
      <Switch>
      <Route exact path="/" component={SkyboundResults} />
      <Route exact path="/add" component={AddVideo}/>
      <Route exact path="/report" component={Report}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
