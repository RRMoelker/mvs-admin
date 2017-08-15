import {
    resetTime,
    pauseTime
} from '../../state/time/reducer.js';

import TimerComponent from './timer.component.js';

class TimerContainer extends HTMLElement {
    constructor () {
        super();
        this.child = new TimerComponent();
        this.appendChild(this.child);

        this.child.addEventListener('reset-timer', () => {
            this.store.dispatch(resetTime());
        });
        this.child.addEventListener('pause-timer', () => {
            this.store.dispatch(pauseTime());
        });
    }

    subscribe () {
        this.store.subscribe(()=>{
            const { time } = this.store.getState();
            // TODO: check if changed
            this.child.setAttribute('time', time.time);
            this.child.setAttribute('running', time.running);
        });
    }

    setStore (store) {
        this.store = store;
        this.subscribe();
    }
}

customElements.define('mvs-timer-container', TimerContainer);
