import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PerfilUsuario from './PerfilUsuario';

describe('<PerfilUsuario />', () => {
  test('it should mount', () => {
    render(<PerfilUsuario />);
    
    const perfilUsuario = screen.getByTestId('PerfilUsuario');

    expect(perfilUsuario).toBeInTheDocument();
  });
});