const ownerDocument = document.currentScript.ownerDocument;

class ControlsComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});  // this.shadowRoot now available
        const template = ownerDocument.querySelector('#component-core');
        const clone = document.importNode(template.content, true);
        this.shadowRoot.appendChild(clone);
    }

    connectedCallback () {
        // Called when the element is inserted into a document, including into a shadow tree
        // console.log('connected');
        // this.onAdd();
    }

    static get observedAttributes () {
        return [
            'config'
        ];
    }

    attributeChangedCallback (name, oldValue, newValue) {
        // Called when an attribute is changed, appended, removed,
        // or replaced on the element. Only called for observed attributes.
        // console.log('attributes', name, oldValue, newValue);

        if(name === 'config') {
            const data = JSON.parse(newValue);
            // console.log(data);
            this.config = data;
        }

        // this[name] = newValue;
        this.draw();
    }

    draw() {
        const rowTemplate = ownerDocument.querySelector('#single-control');

        const rowContainerEl = this.shadowRoot.querySelector('.js-control-container');
        for( const control of this.config ) {
            // console.log(control);
            const row = document.importNode(rowTemplate.content, true);
            row.querySelector('.js-label').innerHTML = control.label;
            row.querySelector('.js-add').addEventListener('click', () => {
                const name = control.name;
                // store.dispatch(addChallenge({
                //     name,
                //     duration: 2000
                // }));
                console.log('clicked', name);
            });
            rowContainerEl.appendChild(row);
        }
    }
}

export default ControlsComponent;
