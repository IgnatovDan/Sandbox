import { render, screen } from '@testing-library/react';
import App from './App';

test('renders <check sources> button', () => {
  render(<App />);
  expect(screen.getByLabelText(/Select ZIP archive with sources/i)).toBeInTheDocument();
});
