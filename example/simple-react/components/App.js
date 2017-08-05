import React from 'react';
import ReactDom from 'react-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>Hello {this.props.name}</h1>;
    }
}
