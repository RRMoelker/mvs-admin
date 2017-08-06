import {
    addChallenge
} from '../../state/challenge/reducer.js';
// TODO proper container, do not extend

import ControlsComponent from './controls.component.js';

// ControlsComponent.prototype.onAdd = () => {
//     console.log('onAdd clicked');
// };


class ControlsContainer extends ControlsComponent {
    constructor () {
        super();
        this.addEventListener('add-challenge', e => {
            this.store.dispatch(addChallenge(e.detail));
        });
    }

    setStore (store) {
        this.store = store;
    }
}

customElements.define('mvs-controls', ControlsContainer);
