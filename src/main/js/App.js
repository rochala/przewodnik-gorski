import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme.js";



class App extends Component {

    render() {
        return (
            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header /> {}
                    <div className='App'>
                        Dziala
                    </div>
                    <Footer />
                </ThemeProvider>
            </React.StrictMode>
        );
    }
}

export default App;