import App from "./App";
import { render } from "react-dom";
import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'));