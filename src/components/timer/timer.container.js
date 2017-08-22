import moment from 'moment';

import {
    setTimer,
    resetTimer,
    pauseTimer
} from '../../state/timer/reducer.js';

import TimerComponent from './timer.component.js';

let interval;
const startInterval = (store) => {
    const timeStart = moment();
    interval = setInterval(() => {
        if(!store.getState().timer.running) {
            return;
        }
        const now = moment();
        const diff = now.diff(timeStart); // ms
        store.dispatch(setTimer(diff));

        if (diff > 60 * 1000) {
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

            if (!interval && timer.running) {
                startInterval(this.store);
            }
        });
    }

    setStore (store) {
        this.store = store;
        this.subscribe();
    }
}

customElements.define('mvs-timer-container', TimerContainer);
