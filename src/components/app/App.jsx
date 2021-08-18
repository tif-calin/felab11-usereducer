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
      return before.length ? {
        before: before.slice(0, -1),
        current: before.pop() || '#ffffff',
        after: [current, ...after]
      } : state;
    case 'redo':
      return after.length ? {
        before: [...before, current],
        current: after[0] || '#ffffff',
        after: after.slice(1)
      } : state;
    case 'record':
      return {
        before: [...before, current],
        current: action.color,
        after
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
      name="color"
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
