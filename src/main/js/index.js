import App from "./App";
import { render } from "react-dom";
import React, { Component } from "react";
import { HashRouter } from 'react-router-dom';

render((
    <HashRouter>
        <App />
    </HashRouter>
), document.getElementById('app'));