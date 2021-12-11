import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BannerLogin from './BannerLogin';

describe('<BannerLogin />', () => {
  test('it should mount', () => {
    render(<BannerLogin />);
    
    const bannerLogin = screen.getByTestId('BannerLogin');

    expect(bannerLogin).toBeInTheDocument();
  });
});