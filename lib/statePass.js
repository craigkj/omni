'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var encodeState = function encodeState(state) {
    return JSON.stringify(state);
};

function createPayload(id, markup, state) {
    var componentMarkup = '<div data-markup-id=' + id + '>' + markup + '</div>';
    var componentState = '<script data-state-id=' + id + '>' + encodeState(state) + '</script>';

    return '<div data-component-id=' + id + '>' + componentMarkup + componentState + '</div>';
}

function decodeState(state) {
    try {
        return JSON.parse(state);
    } catch (error) {
        return state;
    }
}

function buildStateObject(element) {
    var markupContainer = element.firstChild;
    var stateContainer = element.children[1];

    return {
        container: markupContainer,
        state: decodeState(stateContainer.innerHTML)
    };
}

function decodeServerStateForComponent(componentId) {
    var searchResult = document.querySelectorAll('[data-component-id="' + componentId + '"]');

    return _defineProperty({}, componentId, buildStateObject(searchResult[0]));
}

function decodeServerState() {
    if (document) {
        var elements = document.querySelectorAll('[data-component-id]');

        var decodedState = {};

        for (var i = 0; i < elements.length; i++) {
            var id = elements[i].getAttribute('data-component-id');
            decodedState[id] = buildStateObject(elements[i]);
        }

        return decodedState;
    }

    return {};
}

exports.decodeServerStateForComponent = decodeServerStateForComponent;
exports.decodeServerState = decodeServerState;
exports.createPayload = createPayload;
exports.default = {
    decodeServerStateForComponent: decodeServerStateForComponent,
    decodeServerState: decodeServerState,
    createPayload: createPayload
};
