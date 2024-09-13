```javascript
// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';

jest.mock('../Login/Login', () => () => <div>Login Component</div>);
jest.mock('../Dashboard/Dashboard', () => () => <div>Dashboard Component</div>);

describe('App', () => {
  test('renders Login component for the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Login Component')).toBeInTheDocument();
  });

  test('renders Dashboard component for the /dashboard path', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard Component')).toBeInTheDocument();
  });

  test('renders Login component for an unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Login Component')).toBeInTheDocument();
  });
});
```

```javascript
// src/Dashboard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  test('renders dashboard', () => {
    render(<Dashboard />);
    expect(screen.getByText(/welcome to the dashboard!/i)).toBeInTheDocument();
  });
});
```

```javascript
// src/Login/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

// Mocking useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('allows the user to login with correct credentials', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByText(/login/i));

    expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('shows an alert for invalid credentials', () => {
    // Mock window.alert
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'credentials' } });
    fireEvent.click(screen.getByText(/login/i));

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
```