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

    addChallenge (name, duration) {
        this.dispatchEvent(new CustomEvent('add-challenge', {bubbles: true, composed: true, detail: {
            name,
            duration
        }}));
    }

    draw() {
        const rowContainerEl = this.querySelector('.js-control-container');
        for( const [key, value] of Object.entries(this.config) ) {
            const row = document.importNode(rowTemplate.content, true);
            row.querySelector('.js-label').innerHTML = value.label;
            const timeInput = row.querySelector('.js-time');
            row.querySelector('.js-add').addEventListener('mousedown', () => {
                if(isNaN(timeInput.valueAsNumber)) {
                    alert('invalid time');
                } else {
                    return this.addChallenge(key, timeInput.valueAsNumber);
                }

            });
            rowContainerEl.appendChild(row);
        }
    }
}

customElements.define('mvs-controls', ControlsComponent);
export default ControlsComponent;
