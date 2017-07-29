import jsdom from 'jsdom';
import { expect } from 'chai';
import * as Omni from '../src';

const { JSDOM } = jsdom;

describe('Omni', () => {

    describe('SSR Payload', () => {

        it('should contain the expected data attributes', () => {
            const fakeComponentId = 'testComponent';
            const fakeComponent = '<h1>hello world</h1>';
            const fakeState = {
                hello: true,
                world: true
            };

            const payload = Omni.createPayload(fakeComponentId, fakeComponent, fakeState);

            expect(payload).to.contain('data-component-id=testComponent');
            expect(payload).to.contain('data-markup-id=testComponent');
            expect(payload).to.contain('data-state-id=testComponent');
        });

        it('should contain the state in the data-state-id container', () => {
            const fakeComponentId = 'testStateComponent';
            const fakeComponent = '<h1>hello world</h1>';
            const fakeState = {
                state: true
            };

            const payload = Omni.createPayload(fakeComponentId, fakeComponent, fakeState);
            const dom = new JSDOM(`<!DOCTYPE html>${payload}`);
            const stateElement = dom.window.document.querySelectorAll(`[data-state-id="${fakeComponentId}"]`);

            expect(stateElement[0].textContent).to.eql(JSON.stringify(fakeState));
        }); 
    });

    describe('Decoding state on client', () => {

        describe('single component', () => {
            it('should return object with expected keys', () => {

                const fakeComponentId = 'testStateComponent';
                const fakeComponent = '<h1>hello world</h1>';
                const fakeState = {
                    state: true
                };
                const payload = Omni.createPayload(fakeComponentId, fakeComponent, fakeState);

                const dom = new JSDOM(`<!DOCTYPE html>${payload}`);

                global.document = dom.window.document;

                const state = Omni.decodeServerState();

                expect(state).to.have.all.keys(fakeComponentId);
                expect(state[fakeComponentId]).to.have.all.keys(['container', 'state']);
            });
        });

        describe('multiple components', () => {

            const fakeComponentId1 = 'testComponent1';
            const fakeComponentId2 = 'testComponent2';
            const fakeComponent1 = '<h1>hello world</h1>';
            const fakeComponent2 = '<p>nice to see you</p>';
            const fakeState1 = {
                state: true
            };
            const fakeState2 = {
                test: true
            };

            const payload1 = Omni.createPayload(fakeComponentId1, fakeComponent1, fakeState1);
            const payload2 = Omni.createPayload(fakeComponentId2, fakeComponent2, fakeState2);

            describe('decoding entire state', () => {
                it('should return object with expected keys', () => {
                    const dom = new JSDOM(`<!DOCTYPE html><span>${payload1}${payload2}</span>`);

                    global.document = dom.window.document;

                    const state = Omni.decodeServerState();

                    expect(state).to.have.all.keys([fakeComponentId1, fakeComponentId2]);
                });

                it('should return components with the expected states', () => {
                    const dom = new JSDOM(`<!DOCTYPE html><span>${payload1}${payload2}</span>`);

                    global.document = dom.window.document;

                    const state = Omni.decodeServerState();

                    expect(state[fakeComponentId1].state).to.eql(fakeState1);
                    expect(state[fakeComponentId2].state).to.eql(fakeState2);
                });
            });

            describe('decoding state for a single component', () => {
                it('should return the component with the expected state', () => {
                    const dom = new JSDOM(`<!DOCTYPE html><span>${payload1}${payload2}</span>`);

                    global.document = dom.window.document;
                    const state = Omni.decodeServerStateForComponent(fakeComponentId2);

                    expect(state).to.have.all.keys([fakeComponentId2]);
                    expect(state[fakeComponentId2].state).to.eql(fakeState2);
                });
            });
        });
    });
});
