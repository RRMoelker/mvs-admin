const ownerDocument = document.currentScript.ownerDocument;

class PanelComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});  // this.shadowRoot now available
        const template = ownerDocument.querySelector('#component-core');
        const clone = document.importNode(template.content, true);
        this.shadowRoot.appendChild(clone);
    }

    connectedCallback () {
        // Called when the element is inserted into a document, including into a shadow tree
        console.log(this.constructor.name, 'connected');

        const nameEl = this.shadowRoot.querySelector('.js-name');
        nameEl.innerHTML = this.getAttribute('name');
    }
    disconnectedCallback () {
        // Called when the element is removed from a document
        console.log(this.constructor.name, 'disconnected');
    }
}

export default PanelComponent;
