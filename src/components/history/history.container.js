import HistoryComponent from './history.component.js';

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
            this.child.setAttribute('list', JSON.stringify(challenge.list));
        });
    }

    setStore (store) {
        this.store = store;
        this.subscribe();
    }
}

customElements.define('mvs-history-container', HistoryContainer);
