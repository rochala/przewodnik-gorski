import React, {Component} from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "./theme.js";
import Main from "./components/Main"

const navLinks = [
    {title: 'Odznaki', path: '/'},
    {title: 'Trasy', path: '/sections'},
    {title: 'Zarządzanie trasami', path: '/manage/sections'},
]

class App extends Component {


    render() {
        return (
            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Header navLinks={navLinks}/> {}
                    <div className='App'>
                        <Main/>
                    </div>
                    <Footer/>
                </ThemeProvider>
            </React.StrictMode>
        );
    }
}

export default App;