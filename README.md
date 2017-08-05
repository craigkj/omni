# statePass

A js framework agnostic collection of helper functions for passing state from the server to the client for SSR rendered components.

Get
---

// how to install

Use
---

Basic usage is listed below, see the examples folder for a working example using react and webpack.

```javascript
import statePass from 'statePass';

statePass.createPayload('myComponentName', component, state);
```

then on the client:

```javascript
import statePass from 'omni';

const componentData = omni.decodeServerState();

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
