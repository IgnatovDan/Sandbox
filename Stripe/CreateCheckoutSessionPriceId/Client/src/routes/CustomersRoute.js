import { Outlet } from 'react-router-dom';

export default function CustomersRoute() {
  return (
    <>
      <h2>Customers:</h2>
      <Outlet />
    </>
  );
}
