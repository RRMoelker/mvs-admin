import store from './state/store.js';

import { formatTime } from './util/format.js';

const update = (state) => {
    document.querySelector('#time').innerHTML = formatTime(state.time);
};

update(store.getState());

store.subscribe(() => {
    const state = store.getState();
    update(state);
});
