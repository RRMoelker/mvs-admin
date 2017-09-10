import { formatTime } from '../../util/format.js';
import controls from '../../controls.js';

const ownerDocument = document.currentScript.ownerDocument;

class HistoryComponent extends HTMLElement {
    constructor () {
        super();
        const template = ownerDocument.querySelector('#component-core');
        const clone = document.importNode(template.content, true);
        this.appendChild(clone);

        this.params = {};
    }

    static get observedAttributes () {
        return [
            'list',
        ];
    }

    attributeChangedCallback (name, oldValue, newValue) {
        // Called when an attribute is changed, appended, removed,
        // or replaced on the element. Only called for observed attributes.
        this.params[name] = newValue;

        if(name === 'list') {
            this.params[name] = JSON.parse(this.params[name]);
        }

        this.draw();
    }

    removeChallenge (uuid) {
        this.dispatchEvent(new CustomEvent('remove-challenge', {bubbles: true, composed: true, detail: {
            uuid
        }}));
    }

    draw() {
        const rowTemplate = ownerDocument.querySelector('#row');

        const rowContainerEl = this.querySelector('.js-container');

        while (rowContainerEl.firstChild) {
            rowContainerEl.removeChild(rowContainerEl.firstChild);
        }

        const rowEls = [];
        for( const [ , value ] of Object.entries(this.params.list) ) {
            const row = document.importNode(rowTemplate.content, true);
            row.querySelector('.js-label').innerHTML = controls[value.name].label;
            row.querySelector('.js-time').innerHTML = formatTime(value.time);
            row.querySelector('.js-duration').innerHTML = formatTime(value.duration);
            row.querySelector('.js-removeBtn').addEventListener('mousedown',
                () => this.removeChallenge(value.uuid)
            );
            rowEls.unshift(row);
        }
        rowContainerEl.append(...rowEls);
    }
}

customElements.define('mvs-history', HistoryComponent);
export default HistoryComponent;
