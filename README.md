# omni

A js framework agnostic collection of helper functions for passing state from the server to the client for SSR rendered components.

Use
---

```javascript
import Omni from 'omni';

omni.createClientPayload('myComponentName', component, state);
```

then on the client:

```javascript
import Omni from 'omni';

const state = omni.decodeServerState();

// think of example and finish this.

```

Develop
---

Requires: node6+

```sh
> npm install
> npm test
```

Inspired by use of React and Preact, and heavilly by Iso.
