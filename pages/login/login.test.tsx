import { render, screen } from '@testing-library/react';
import { Login } from '.';

describe('Login page', () => {
  it('has sign in description', () => {
    render(<Login />);
    expect(screen.getByText(/Ethereum address/)).toBeTruthy();
  });
});
