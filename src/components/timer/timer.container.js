import moment from 'moment';

import { TIMER_INTERVAL } from '../../constants.js';
import {
    setTimer,
    resetTimer,
    pauseTimer
} from '../../state/timer/reducer.js';

import TimerComponent from './timer.component.js';


let elapsed = 0;
let lastNow;
const startInterval = (store) => {
    lastNow = moment();
    setInterval(() => {
        if(!store.getState().timer.running) {
            lastNow = moment();
            return;
        }
        const now = moment();
        elapsed = elapsed + now.diff(lastNow); // ms
        store.dispatch(setTimer(elapsed));

        lastNow = now;
    }, TIMER_INTERVAL);
};

class TimerContainer extends HTMLElement {
    constructor () {
        super();
        this.child = new TimerComponent();
        this.appendChild(this.child);

    }

    onStateChange(state) {
        const { timer } = state;
        // TODO: check if changed
        this.child.setAttribute('time', timer.time);
        this.child.setAttribute('running', timer.running);
    }

    setStore (store) {
        store.subscribe(()=>{
            this.onStateChange(store.getState());
        });
        this.onStateChange(store.getState());
        startInterval(store);

        this.child.addEventListener('reset-timer', () => {
            store.dispatch(resetTimer());
        });
        this.child.addEventListener('pause-timer', () => {
            store.dispatch(pauseTimer());
        });
    }
}

customElements.define('mvs-timer-container', TimerContainer);
