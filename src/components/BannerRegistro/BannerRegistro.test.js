import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BannerRegistro from './BannerRegistro';

describe('<BannerRegistro />', () => {
  test('it should mount', () => {
    render(<BannerRegistro />);
    
    const bannerRegistro = screen.getByTestId('BannerRegistro');

    expect(bannerRegistro).toBeInTheDocument();
  });
});