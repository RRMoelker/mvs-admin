import store from './store.js';

it('should initialize the store', () =>{
    const state = store.getState();
    expect(state).toMatchSnapshot();
});
