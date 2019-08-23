import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BubblePage from "./components/BubblePage"
import PrivateRoute from './components/PrivateRoute';
import Login from "./components/Login";
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <Link to="/bubblepage">BubblePage</Link>
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated (CHECK)
        */}
        <PrivateRoute exact path="/bubblepage" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
