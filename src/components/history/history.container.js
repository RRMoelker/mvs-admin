import { removeChallenge } from '../../state/challenge/reducer.js';
import { SHOW_HISTORY } from '../../constants.js';

import HistoryComponent from './history.component.js';


class HistoryContainer extends HTMLElement {
    constructor () {
        super();
        this.child = new HistoryComponent();
        this.appendChild(this.child);

        this.child.addEventListener('remove-challenge', e => {
            this.store.dispatch(removeChallenge(e.detail));
        });
    }

    subscribe () {
        this.store.subscribe(()=>{
            const { challenge } = this.store.getState();
            // TODO: check if changed
            this.child.setAttribute('list', JSON.stringify(challenge.list.slice(-SHOW_HISTORY)));
        });
    }

    setStore (store) {
        this.store = store;
        this.subscribe();
    }
}

customElements.define('mvs-history-container', HistoryContainer);
