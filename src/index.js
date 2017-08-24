// import '@webcomponents/webcomponentsjs/webcomponents-lite.js'; // polyfill HTML Imports, Custom Elements, not shadow dom

import controls from './controls.js';

import store from './state/store.js';
import {
    addChallenge
} from './state/challenge/reducer.js';

for(let i=0; i < 2; ++i) {
    store.dispatch(addChallenge({
        name: 'minimap',
        duration: 2 * 60 * 1000
    }));
}

document.querySelector('mvs-controls-container').setStore(store);
document.querySelector('mvs-controls-container').setAttribute('config', JSON.stringify(controls));
document.querySelector('mvs-timer-container').setStore(store);
document.querySelector('mvs-challenges-container').setStore(store);
document.querySelector('mvs-history-container').setStore(store);