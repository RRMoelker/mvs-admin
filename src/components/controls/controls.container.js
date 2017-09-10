import { addChallenge } from '../../state/challenge/reducer.js';

import ControlsComponent from './controls.component.js';

class ControlsContainer extends HTMLElement {
    constructor () {
        super();
        this.child = new ControlsComponent();
        this.appendChild(this.child);

        this.child.addEventListener('add-challenge', e => {
            this.store.dispatch(addChallenge(e.detail));
        });
    }

    static get observedAttributes () {
        return [
            'config'
        ];
    }

    attributeChangedCallback (name, oldValue, newValue) {
        this.child.setAttribute(name, newValue);
    }

    setStore (store) {
        this.store = store;
    }
}

customElements.define('mvs-controls-container', ControlsContainer);
