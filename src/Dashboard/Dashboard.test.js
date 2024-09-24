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

describe('Dashboard', () => {
  test('renders dashboard', () => {
    render(<Dashboard />);
    expect(screen.getByText(/welcome to the dashboard!/i)).toBeInTheDocument();
  });
});
```