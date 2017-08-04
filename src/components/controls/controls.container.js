// import {
//     addChallenge
// } from './state/challenge/reducer.js';

import ControlsComponent from './controls.component.js';

ControlsComponent.prototype.onAdd = () => {
    console.log('onAdd clicked');
};

customElements.define('mvs-controls', ControlsComponent);
