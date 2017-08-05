import React from 'react';
import App from './components/App';
import ReactDom from 'react-dom';
import * as statePass from '../../lib/statePass';

function bootstrap() {
    const serverState = statePass.decodeServerState(); // user statePass to decode the state
    const componentData = serverState.helloWorld || {};
    const componentState = componentData.state; // the component state
    const componentContainer = componentData.container; // the element containing the component

    console.log('Client side render with the server state picked up from dom.');
    console.log(componentState);

    ReactDom.render(
        <App {...componentState} />,
        componentContainer
    );
}

bootstrap();
