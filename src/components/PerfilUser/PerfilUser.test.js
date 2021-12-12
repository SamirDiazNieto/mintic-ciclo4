import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PerfilUser from './PerfilUser';

describe('<PerfilUser />', () => {
  test('it should mount', () => {
    render(<PerfilUser />);
    
    const perfilUser = screen.getByTestId('PerfilUser');

    expect(perfilUser).toBeInTheDocument();
  });
});