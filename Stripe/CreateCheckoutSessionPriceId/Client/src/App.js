import './App.css';
import CustomersList from './components/CustomersList';
import ProductsList from './components/ProductsList';

function App() {
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

export default App;
