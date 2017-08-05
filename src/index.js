const encodeState = state => JSON.stringify(state);

function createPayload(id, markup, state) {
    const componentMarkup = `<div data-markup-id=${id}>${markup}</div>`;
    const componentState = `<script data-state-id=${id}>${encodeState(state)}</script>`;

    return `<div data-component-id=${id}>${componentMarkup}${componentState}</div>`;
}

function decodeState(state) {
    try {
        return JSON.parse(state);
    } catch (error) {
        return state;
    }
}

function buildStateObject(element) {
    const markupContainer = element.firstChild;
    const stateContainer = element.children[1];

    return {
        container: markupContainer,
        state: decodeState(stateContainer.innerHTML)
    };
}

function decodeServerStateForComponent(componentId) {
    const searchResult = document.querySelectorAll(`[data-component-id="${componentId}"]`);

    return {
        [componentId]: buildStateObject(searchResult[0])
    }
}

function decodeServerState() {
    if (document) {
        const elements = document.querySelectorAll('[data-component-id]');

        let decodedState = {};

        for (let i = 0; i < elements.length; i++) {
            const id = elements[i].getAttribute('data-component-id');
            decodedState[id] = buildStateObject(elements[i]);
        }

        return decodedState;
    }

    return {};
}

export {
    decodeServerStateForComponent,
    decodeServerState,
    createPayload
}

export default {
    decodeServerStateForComponent,
    decodeServerState,
    createPayload
}
