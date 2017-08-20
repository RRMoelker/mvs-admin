import HistoryComponent from './history.component.js';

import { SHOW_HISTORY } from '../../constants.js';

class HistoryContainer extends HTMLElement {
    constructor () {
        super();
        this.child = new HistoryComponent();
        this.appendChild(this.child);
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
