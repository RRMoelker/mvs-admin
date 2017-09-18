import reducer, {
    setTimer,
    resetTimer,
    pauseTimer
} from './reducer.js';


it('should set the time', () =>{
    const result = reducer({
        time: 5
    }, setTimer(2));

    expect(result).toMatchSnapshot();
});

it('should reset the time', () =>{
    const result = reducer({
        time: 5
    }, resetTimer());

    expect(result).toMatchSnapshot();
});

it('should pause the timer', () => {
    const result = reducer({
        running: false
    }, pauseTimer());

    expect(result).toMatchSnapshot();
});

it('should resume the timer', () => {
    const result = reducer({
        running: false
    }, pauseTimer());

    expect(result).toMatchSnapshot();
});
