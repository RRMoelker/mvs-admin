// import '@webcomponents/webcomponentsjs/webcomponents-lite.js'; // polyfill HTML Imports, Custom Elements, not shadow dom

import controls from './controls.js';

import moment from 'moment';

import store from './state/store.js';
import {
    addChallenge
} from './state/challenge/reducer.js';
import {
    setTime
} from './state/time/reducer.js';

for(let i=0; i < 2; ++i) {
    store.dispatch(addChallenge({
        name: 'minimap',
        duration: 2 * 60 * 1000
    }));
}

const timeStart = moment();
const interval = setInterval(() => {
    if(!store.getState().time.running) {
        return;
    }
    const now = moment();
    const diff = now.diff(timeStart); // ms
    store.dispatch(setTime(diff));

    if (diff > 60 * 1000) {
        clearInterval(interval);
    }
}, 200);

document.querySelector('mvs-controls-container').setStore(store);
document.querySelector('mvs-controls-container').setAttribute('config', JSON.stringify(controls));
document.querySelector('mvs-timer-container').setStore(store);
document.querySelector('mvs-challenges-container').setStore(store);
document.querySelector('mvs-history-container').setStore(store);
