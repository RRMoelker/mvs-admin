const ownerDocument = document.currentScript.ownerDocument;

class PanelComponent extends HTMLElement {
    constructor () {
        super();
        const template = ownerDocument.querySelector('#component-core');
        const clone = document.importNode(template.content, true);
        this.appendChild(clone);
    }

    connectedCallback () {
        const nameEl = this.querySelector('.js-name');
        nameEl.innerHTML = this.getAttribute('name');
    }

}

customElements.define('mvs-panel', PanelComponent);
