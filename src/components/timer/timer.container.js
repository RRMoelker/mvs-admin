import moment from 'moment';

import {
    setTimer,
    resetTimer,
    pauseTimer
} from '../../state/timer/reducer.js';

import TimerComponent from './timer.component.js';

let interval;
let elapsed = 0;
let lastNow;
const startInterval = (store) => {
    lastNow = moment();
    interval = setInterval(() => {
        if(!store.getState().timer.running) {
            lastNow = moment();
            return;
        }
        const now = moment();
        elapsed = elapsed + now.diff(lastNow); // ms
        store.dispatch(setTimer(elapsed));

        lastNow = now;

        if (elapsed > 60 * 1000) {
            clearInterval(interval);
        }
    }, 200);
};

class TimerContainer extends HTMLElement {
    constructor () {
        super();
        this.child = new TimerComponent();
        this.appendChild(this.child);

        this.child.addEventListener('reset-timer', () => {
            this.store.dispatch(resetTimer());
        });
        this.child.addEventListener('pause-timer', () => {
            this.store.dispatch(pauseTimer());
        });
    }

    subscribe () {
        this.store.subscribe(()=>{
            const { timer } = this.store.getState();
            // TODO: check if changed
            this.child.setAttribute('time', timer.time);
            this.child.setAttribute('running', timer.running);
        });
        startInterval(this.store);
    }

    setStore (store) {
        this.store = store;
        this.subscribe();
    }
}

customElements.define('mvs-timer-container', TimerContainer);
