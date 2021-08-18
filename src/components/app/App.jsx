import React, { useReducer } from 'react';

const initialState = {
  before: [],
  current: '#ffffff',
  after: []
};

const reducer = (state, action) => {

  const { before, current, after } = state;

  switch (action.type) {
    case 'undo':
      return {
        before: [...before.slice(0, -1)],
        current: before[before.length - 1],
        after: [...after]
      };
    case 'redo':
      return {
        before: [...before],
        current: after[0],
        after: [...after.slice(1)]
      };
    case 'record':
      return {
        before: [...before, current],
        current: action.color,
        after: [] // not original functionality but i think it makes sense
      };
    default:
      return state;
  }
};


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { current } = state;

  return <>
    <button onClick={() => dispatch({ type: 'undo' })}>undo</button>
    <button onClick={() => dispatch({ type: 'redo' })}>redo</button>
    <input
      type="color"
      value={current}
      onChange={({ target }) => 
        dispatch({ type: 'record', color: target.value })
      }
    />
    <div
      style={{ backgroundColor: current, width: '10rem', height: '10rem' }}
    >{current}</div>
  </>;
}

export default App;
