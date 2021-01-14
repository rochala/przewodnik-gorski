'use strict';

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const client = require('./client'); // <3>
// end::vars[]

// tag::app[]
class App extends React.Component { // <1>

    constructor(props) {
        super(props);
        this.state = {sections: []};
    }

    componentDidMount() { // <2>
        client({method: 'GET', path: '/api/sections'}).done(response => {
            this.setState({sections: response.entity._embedded.sections});
        });
    }

    render() { // <3>
        return (
            <SectionList sections={this.state.sections}/>
        )
    }
}
// end::app[]

// tag::employee-list[]
class SectionList extends React.Component{
    render() {
        const sections = this.props.sections.map(section =>
            <Section key={section._links.self.href} section={section}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Length</th>
                    <th>Start to End Points</th>
                    <th>End to Start Points</th>
                    <th>Description</th>
                </tr>
                {sections}
                </tbody>
            </table>
        )
    }
}
// end::employee-list[]

// tag::employee[]
class Section extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.section.length}</td>
                <td>{this.props.section.start_to_end_points}</td>
                <td>{this.props.section.end_to_start_points}</td>
                <td>{this.props.section.description}</td>
            </tr>
        )
    }
}
// end::employee[]

// tag::render[]
ReactDOM.render(
    <App />,
    document.getElementById('react')
)
// end::render[]