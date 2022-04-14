import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const activeLinkStyle = ({ isActive }) =>
    isActive ? { color: 'red' } : null; // TODO: replace 'in each NavLink' function with declaration
  return (
    <nav style={{ borderBottom: '1px solid' }}>
      <NavLink to="/" style={activeLinkStyle}>
        Home
      </NavLink>{' '}
      |{' '}
      <NavLink to="/customers" style={activeLinkStyle}>
        Customers
      </NavLink>{' '}
      |{' '}
      <NavLink to="/products" style={activeLinkStyle}>
        Products
      </NavLink>
    </nav>
  );
}
