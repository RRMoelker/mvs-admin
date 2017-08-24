import { removeChallenge } from '../../state/challenge/reducer.js';
import { SHOW_HISTORY } from '../../constants.js';

import HistoryComponent from './history.component.js';

class HistoryContainer extends HTMLElement {
    constructor () {
        super();
        this.child = new HistoryComponent();
        this.appendChild(this.child);
    }

    onStateChange(state) {
        const { challenge } = state;
        // TODO: check if changed
        this.child.setAttribute('list', JSON.stringify(challenge.list.slice(-SHOW_HISTORY)));
    }

    setStore (store) {
        store.subscribe(()=>{
            this.onStateChange(store.getState());
        });
        this.onStateChange(store.getState());

        this.child.addEventListener('remove-challenge', e => {
            store.dispatch(removeChallenge(e.detail));
        });
    }
}

customElements.define('mvs-history-container', HistoryContainer);
