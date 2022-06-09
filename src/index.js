import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./scss/index.scss";
import "./components/lib/Monitor"

ReactDOM.render(<App />, document.getElementById("root"));
