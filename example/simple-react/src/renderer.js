import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../components/App';
import * as statePass from '../../../lib/statePass';

function renderApp(req, res) {
    const state = {
        name: 'world'
    }

    const component = renderToString(<App {...state} />);
    const htmlPayload = statePass.createPayload('helloWorld', component, state);

    res.render('index', { htmlPayload });
}

export {
    renderApp
}
