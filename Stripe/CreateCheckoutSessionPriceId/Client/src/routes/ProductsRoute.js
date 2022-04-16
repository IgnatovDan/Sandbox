import { Outlet } from 'react-router-dom';

export default function ProductsRoute() {
  return (
    <>
      <h2>Products:</h2>
      <Outlet />
    </>
  );
}
