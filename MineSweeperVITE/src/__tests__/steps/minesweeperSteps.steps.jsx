import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import  App  from '../../App.jsx';

export const minesweeper = ({
  given: Given,
  and: And,
  when: When,
  then: Then
}) => {
  Given(/^the player opens the game$/, () => {
    render(<App />);
  });

  Then(/^all the cells should be covered$/, () => {
    const cells = screen.getAllByTestId('square');
    cells.forEach(cell => {
      expect(cell).not.toHaveClass('square is-selected');
    });
  });
};

export default minesweeper;