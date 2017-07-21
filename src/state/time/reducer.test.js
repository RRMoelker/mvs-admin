import reducer, {
    setTime,
    resetTime,
    pauseTime
} from './reducer.js';


it('should set the time', () =>{
    const result = reducer({
        time: 5
    }, setTime(2));

    expect(result).toMatchSnapshot();
});

it('should reset the time', () =>{
    const result = reducer({
        time: 5
    }, resetTime());

    expect(result).toMatchSnapshot();
});

it('should pause the timer', () => {
   const result = reducer({
       running: false
   }, pauseTime());

   expect(result).toMatchSnapshot();
})

it('should resume the timer', () => {
   const result = reducer({
       running: false
   }, pauseTime());

   expect(result).toMatchSnapshot();
})
