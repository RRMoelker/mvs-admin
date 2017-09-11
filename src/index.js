import { CHALLENGES } from './constants.js';

import store from './state/store.js';
import {
    addChallenge
} from './state/challenge/reducer.js';

for(let i=0; i < 1; ++i) {
    store.dispatch(addChallenge({
        name: 'minimap',
        duration: 2 * 60 * 1000
    }));
}

document.querySelector('mvs-controls-container').setStore(store);
document.querySelector('mvs-controls-container').setAttribute('config', JSON.stringify(CHALLENGES));
document.querySelector('mvs-timer-container').setStore(store);
document.querySelector('mvs-challenges-container').setStore(store);
document.querySelector('mvs-history-container').setStore(store);
