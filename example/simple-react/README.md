Intro
---

Simple example showing a server side rendered react component being initialised on the client with the same state. Fetching fresh data from the server on load is (obviously) an asynchronous operation that could take time, or fail. Rendering like this avoids this problem, and crucially avoids a full reflow, allowing instant use of client side react functions, event handlers and so on, and not throwing away the work of rendering the component on the server.

To run
---

```
> npm install
> npm run build
> npm start
```
