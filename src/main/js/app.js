'use strict';

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
// end::vars[]

// tag::app[]
class App extends React.Component { // <1>

    render() { // <3>
        return (
            <h> hello </h>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('react')
)
// end::render[]