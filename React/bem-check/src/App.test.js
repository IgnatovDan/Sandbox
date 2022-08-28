import { render, screen } from '@testing-library/react';
import App from './App';

test('renders <check sources> button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /check sources/i })).toBeInTheDocument();
});
