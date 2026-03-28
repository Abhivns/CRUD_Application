import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';

test('renders login page heading for guest users', () => {
  render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      initialEntries={['/login']}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});
