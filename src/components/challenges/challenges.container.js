import ChallengesComponent from './challenges.component.js';
import { RECENT_THRESHOLD } from '../../constants.js';

import {
    selectRecent,
    selectRemaining
} from '../../state/challenge/reducer';

class ChallengesContainer extends HTMLElement {
    constructor () {
        super();
        this.child = new ChallengesComponent();
        this.appendChild(this.child);
    }

    subscribe () {
        this.store.subscribe(()=>{
            const { challenge, time } = this.store.getState();
            // TODO: check if changed
            const remainingList = selectRemaining(challenge.list, time.time);
            this.child.setAttribute('list', JSON.stringify(remainingList));

            const recentList = selectRecent(challenge.list, time.time, RECENT_THRESHOLD);
            this.child.setAttribute('recent', JSON.stringify(recentList));
        });
    }

    setStore (store) {
        this.store = store;
        this.subscribe();
    }
}

customElements.define('mvs-challenges-container', ChallengesContainer);
