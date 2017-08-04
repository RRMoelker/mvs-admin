import PanelComponent from './panel.component.js';

PanelComponent.prototype.onAdd = () => {
    console.log('onAdd clicked');
};

customElements.define('mvs-panel', PanelComponent);
