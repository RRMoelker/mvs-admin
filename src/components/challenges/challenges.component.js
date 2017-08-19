import { formatTime } from '../../util/format.js';

const ownerDocument = document.currentScript.ownerDocument;
const rowTemplate = ownerDocument.querySelector('#row');

class ChallengesComponent extends HTMLElement {
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

    draw() {

        const rowContainerEl = this.querySelector('.js-container');

        while (rowContainerEl.firstChild) {
            rowContainerEl.removeChild(rowContainerEl.firstChild);
        }
        for( const [ key, value ] of Object.entries(this.params.list) ) {
            const row = document.importNode(rowTemplate.content, true);
            row.querySelector('.js-label').innerHTML = key;
            row.querySelector('.js-remaining').innerHTML = formatTime(value.remaining);
            row.querySelector('.js-until').innerHTML = formatTime(value.until);
            rowContainerEl.appendChild(row);
        }
    }
}

customElements.define('mvs-challenges', ChallengesComponent);
export default ChallengesComponent;
