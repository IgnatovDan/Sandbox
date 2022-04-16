import CustomersList from './CustomersList';
import ProductsList from './ProductsList';

export default function HomeRoute() {
  return (
    <>
      Customers:
      <CustomersList />
      <hr />
      Products:
      <ProductsList />
    </>
  );
}
