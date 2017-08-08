# state-pass

A framework agnostic collection of js helper functions for passing state from the server to the client for SSR rendered components. Allowing benefit or server side rendering but also allowing instant js initialisation on the client that is not dependant on an ajax call to the server for data.

React example:

1. User makes request to server, state is generated, component rendered via `renderToString` and both returned in the html payload to the client.
2. Client displays the server rendered component, and then picks up the state and uses it to call `react.render` on the client allowing the initialisation of react js behaviour (click events and so on) without causing a full page reflow.

Get
---

`npm install state-pass`

Use
---

Basic usage is listed below, see the examples folder for a working example using react and webpack.

```javascript
import statePass from 'state-pass';

statePass.createPayload('myComponentName', component, state);
```

then on the client:

```javascript
import statePass from 'state-pass';

const componentData = statePass.decodeServerState();

const state = componentData.myComponentName.state;
const component = componentData.myComponentName.component;

// use the state on the client to re-render the component
```

Develop
---

Requires: node6+

```sh
> npm install
> npm test
```

Inspired by use of React and Preact, and heavilly by Iso.
