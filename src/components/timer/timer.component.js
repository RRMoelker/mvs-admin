import { formatTime } from '../../util/format.js';

const ownerDocument = document.currentScript.ownerDocument;

class TimerComponent extends HTMLElement {
    constructor () {
        super();
        const template = ownerDocument.querySelector('#component-core');
        const clone = document.importNode(template.content, true);
        this.appendChild(clone);

        this.params = {};
    }

    connectedCallback () {
        this.pauseBtn = this.querySelector('.js-pauseBtn');
        // Called when the element is inserted into a document, including into a shadow tree
        this.pauseBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('pause-timer', {bubbles: true, composed: true, }));
        });
        this.querySelector('.js-resetBtn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('reset-timer', {bubbles: true, composed: true, }));
        });
    }

    static get observedAttributes () {
        return [
            'time',
            'running'
        ];
    }

    attributeChangedCallback (name, oldValue, newValue) {
        // Called when an attribute is changed, appended, removed,
        // or replaced on the element. Only called for observed attributes.
        this.params[name] = newValue;

        switch(name) {
        case 'running':
            this.pauseBtn.innerHTML = JSON.parse(newValue) ? 'pause' : 'play';
            break;
        }
        this.draw();
    }

    draw() {
        const timeDisplay = this.querySelector('.js-time');
        timeDisplay.innerHTML = formatTime(parseInt(this.params.time));
    }
}

customElements.define('mvs-timer', TimerComponent);
export default TimerComponent;
