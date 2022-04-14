import { Outlet } from 'react-router-dom';

export default function CustomersRoute() {
  return (
    <>
      Customers:
      <Outlet />
    </>
  );
}
