import { formatTime } from '../../util/format.js';
import { ALMOST_THRESHOLD } from '../../constants.js';

import * as d3 from 'd3';

const ownerDocument = document.currentScript.ownerDocument;
const rowTemplate = ownerDocument.querySelector('#row');

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
        // Called when the element is inserted into a document, including into a shadow tree
        console.log(this.constructor.name, 'connected');

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
        // Join new data with old elements, if any.
        const join = this.container
            .selectAll('tr')
                .data(table, d => d[0]);

        // UPDATE
        // Update old elements as needed.

        // ENTER
        // Create new elements as needed.
        //
        const d3Enter = join.enter()
            .append('tr')
            // .style("color", "green") // make the body green
            // .transition(t).style("opacity", 0);
            .attr('class', 'c-challenges__challenge--enter');

        // ENTER + UPDATE
        // After merging the entered elements with the update selection,
        // apply operations to both.
        const innerJoin = d3Enter.merge(join)
            .selectAll('td')
                .data(r => r);

        const d3InnerEnter =
            innerJoin.enter()
                .append('td')
                    .text(d => d)
                    .classed('enter', true);

        d3InnerEnter.merge(innerJoin)
            .classed('enter', false)
            .text(d => d);

        // EXIT
        // Remove old elements as needed.
        const exit = join.exit();

        const exitTime = 1000; // 1s
        join.exit()
            .attr('class', 'c-challenges__challenge--exit')
            .transition().delay( exitTime )
            .remove();
        // console.log('exit: ', exit.size());

    }
}

customElements.define('mvs-challenges', ChallengesComponent);
export default ChallengesComponent;
