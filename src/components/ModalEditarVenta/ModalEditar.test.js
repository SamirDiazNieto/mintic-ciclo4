import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalEditar from './ModalEditar';

describe('<ModalEditar />', () => {
  test('it should mount', () => {
    render(<ModalEditar />);
    
    const modalEditar = screen.getByTestId('ModalEditar');

    expect(modalEditar).toBeInTheDocument();
  });
});