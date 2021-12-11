import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VistaVenta from './VistaVenta';

describe('<VistaVenta />', () => {
  test('it should mount', () => {
    render(<VistaVenta />);
    
    const vistaVenta = screen.getByTestId('VistaVenta');

    expect(vistaVenta).toBeInTheDocument();
  });
});