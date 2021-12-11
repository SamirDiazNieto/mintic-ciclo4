import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalCrear from './ModalCrearVenta';

describe('<ModalCrear />', () => {
  test('it should mount', () => {
    render(<ModalCrear />);
    
    const modalCrear = screen.getByTestId('ModalCrear');

    expect(modalCrear).toBeInTheDocument();
  });
});