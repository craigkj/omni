import express from 'express';
import path from 'path';
import { renderApp } from './renderer';

const start = (port = 8080) => {
    const app = express();
    app.use(express.static('public'));
    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "../views"));

    app.use('/', renderApp);

    return app.listen(port, () => {
        console.log(`statePass example running on: ${port}`);
    });
};

export {
    start,
    start as default,
};
