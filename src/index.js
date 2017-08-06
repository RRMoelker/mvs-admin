// import '@webcomponents/webcomponentsjs/webcomponents-lite.js'; // polyfill HTML Imports, Custom Elements, not shadow dom

import controls from './controls.js';

import moment from 'moment';

import store from './state/store.js';
import {
    addChallenge
} from './state/challenge/reducer.js';
import {
    resetTime,
    setTime,
    pauseTime
} from './state/time/reducer.js';
import { selectRemaining } from './state/challenge/reducer';

import { formatTime } from './util/format.js';

const globalTime = document.querySelector('#time');
const activeChallenges = document.querySelector('#activeChallenges');
const history = document.querySelector('#challengeHistory');
const resetBtn = document.querySelector('#resetBtn');
const pauseBtn = document.querySelector('#pauseBtn');

for(let i=0; i< 3; ++i) {
    store.dispatch(addChallenge({
        name: 'minimap',
        duration: 1000
    }));
}

resetBtn.addEventListener('click', () => {
    store.dispatch(resetTime());
});
pauseBtn.addEventListener('click', () => {
    store.dispatch(pauseTime());
});

const timeStart = moment();
const interval = setInterval(() => {
    if(!store.getState().time.running) {
        return;
    }
    const now = moment();
    const diff = now.diff(timeStart); // ms
    store.dispatch(setTime(diff));

    // if (diff > 3000) {
    //     clearInterval(interval);
    // }
}, 200);

const update = (state) => {
    globalTime.innerHTML = formatTime(state.time.time);

    const remainingChallenges = selectRemaining(state.challenge.list, state.time.time);
    activeChallenges.innerHTML = Object.keys(remainingChallenges).map(
        key => {
            const item = remainingChallenges[key];
            return `<tr><td>${key}</td><td>${formatTime(item.remaining)}</td><td>${formatTime(item.until)}</td></tr>`;
        }
    ).join('');
    history.innerHTML = state.challenge.list.map(
        item => `<tr><td>${item.name}</td><td>${formatTime(item.time)}</td><td>${formatTime(item.duration)}</td></tr>`
    ).join('');
};

update(store.getState());

store.subscribe(() => {
    const state = store.getState();
    update(state);
});

const controlsEl = document.querySelector('.js-controls');
controlsEl.setAttribute('config', JSON.stringify(controls));
controlsEl.setStore(store);
