import React from 'react';
import './App.css';
import APITest from "./APITest.js";
import Add from "./Add.js";
import Report from "./Report.js";

function App() {
  return (
    <div className="App">
      <APITest />
      {/* <Report /> */}
      <Add />
    </div>
  );
}

export default App;
