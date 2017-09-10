import { formatTime } from '../../util/format.js';
import { ALMOST_THRESHOLD } from '../../constants.js';

import * as d3 from 'd3';

const ownerDocument = document.currentScript.ownerDocument;

class ChallengesComponent extends HTMLElement {
    constructor () {
        super();
        const template = ownerDocument.querySelector('#component-core');
        const clone = document.importNode(template.content, true);
        this.appendChild(clone);

        this.params = {
            recent: {}
        };
    }

    static get observedAttributes () {
        return [
            'list',
            'recent'
        ];
    }

    connectedCallback () {
        this.container = d3.select('.js-container');
    }

    attributeChangedCallback (name, oldValue, newValue) {
        // Called when an attribute is changed, appended, removed,
        // or replaced on the element. Only called for observed attributes.
        this.params[name] = newValue;

        if(name === 'list') {
            this.params[name] = JSON.parse(this.params[name]);
        }
        if(name === 'recent') {
            this.params[name] = JSON.parse(this.params[name]);
        }

        this.draw();
    }

    draw() {
        const someData = Object.entries(this.params.list);
        const table = [];
        for( const [ key, value ] of someData ) {
            table.push([key, formatTime(value.remaining), formatTime(value.until)]);
        }

        // DATA JOIN
        const rowsJoin = this.container
            .selectAll('tr')
                .data(table, d => d[0]);

        // UPDATE

        // ENTER
        const rowsEnter = rowsJoin.enter()
            .append('tr')
            .attr('class', 'c-challenges__challenge--enter');

        // ENTER + UPDATE
        const rowJoin = rowsEnter.merge(rowsJoin)
            .selectAll('td')
                .data(r => r);

        const rowEnter =
            rowJoin.enter()
                .append('td')
                    .text(d => d)
                    .classed('enter', true);

        rowEnter.merge(rowJoin)
            .classed('enter', false)
            .text(d => d);

        // EXIT
        const exitTime = 1000; // 1s
        rowsJoin.exit()
            .attr('class', 'c-challenges__challenge--exit')
            .transition().delay( exitTime )
            .remove();
    }
}

customElements.define('mvs-challenges', ChallengesComponent);
export default ChallengesComponent;
