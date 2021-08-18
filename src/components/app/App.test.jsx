import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {

  afterEach(() => cleanup());

  test('snapshot test for App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('can record, redo, and undo color changes', () => {
    const app = render(<App />);

    const undoButton = app.getByText('undo');
    const redoButton = app.getByText('redo');
    const displayDiv = app.getByText('#ffffff');
    const colorInput = app.getByDisplayValue('#ffffff');

    // change the color thrice
    fireEvent.change(colorInput, { target: { value: '#AABBCC' } });
    expect(displayDiv).toHaveStyle({ backgroundColor: '#AABBCC' });
    fireEvent.change(colorInput, { target: { value: '#11AA55' } });
    expect(displayDiv).toHaveStyle({ backgroundColor: '#11AA55' });
    fireEvent.change(colorInput, { target: { value: '#ABC123' } });
    expect(displayDiv).toHaveStyle({ backgroundColor: '#ABC123' });

    // click undo button twice
    fireEvent.click(undoButton);
    expect(displayDiv).toHaveStyle({ backgroundColor: '#11AA55' });
    fireEvent.click(undoButton);
    expect(displayDiv).toHaveStyle({ backgroundColor: '#AABBCC' });

    // click redo button
    fireEvent.click(redoButton);
    expect(displayDiv).toHaveStyle({ backgroundColor: '#11AA55' });
  });

});
