import { NavLink } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';

export default function Navigation() {
  const activeLinkStyle = ({ isActive }) => (isActive ? { color: 'red' } : null); // TODO: replace 'in each NavLink' function with declaration
  return (
    <nav style={{ borderBottom: '1px solid' }}>
      <NavLink to="/" style={activeLinkStyle}>
        Home
      </NavLink>{' '}
      |{' '}
      <NavLink to={AppRoutes.customersPath} style={activeLinkStyle}>
        Customers
      </NavLink>{' '}
      |{' '}
      <NavLink to={AppRoutes.productsPath} style={activeLinkStyle}>
        Products
      </NavLink>
    </nav>
  );
}
