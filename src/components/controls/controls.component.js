const ownerDocument = document.currentScript.ownerDocument;
const rowTemplate = ownerDocument.querySelector('#single-control');

class ControlsComponent extends HTMLElement {
    constructor () {
        super();
        const template = ownerDocument.querySelector('#component-core');
        const clone = document.importNode(template.content, true);
        this.appendChild(clone);
    }

    static get observedAttributes () {
        return [
            'config'
        ];
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if(name === 'config') {
            const data = JSON.parse(newValue);
            this.config = data;
        }

        this.draw();
    }

    draw() {

        const rowContainerEl = this.querySelector('.js-control-container');
        for( const control of this.config ) {
            const row = document.importNode(rowTemplate.content, true);
            row.querySelector('.js-label').innerHTML = control.label;
            row.querySelector('.js-add').addEventListener('click', () => {
                const name = control.name;
                const duration = 2000;
                this.dispatchEvent(new CustomEvent('add-challenge', {bubbles: true, composed: true, detail: {
                    name,
                    duration
                }}));
            });
            rowContainerEl.appendChild(row);
        }
    }
}

customElements.define('mvs-controls', ControlsComponent);
export default ControlsComponent;
