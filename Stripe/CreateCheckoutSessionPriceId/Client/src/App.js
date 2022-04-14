import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import CustomersRoute from './routes/CustomersRoute';
import ProductsRoute from './routes/ProductsRoute';
import HomeRoute from './components/Dashboard';
import Navigation from './components/Navigation';
import Product from './components/Product';
import AppRoutes from './routes/AppRoutes';
import ProductsList from './components/ProductsList';
import CustomersList from './components/CustomersList';
import Customer from './components/Customer';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<HomeRoute />}></Route>
          <Route path={AppRoutes.customersPath} element={<CustomersRoute />}>
            <Route index element={<CustomersList />} />
            <Route path=":id" element={<Customer />} />
          </Route>
          <Route path={AppRoutes.productsPath} element={<ProductsRoute />}>
            <Route index element={<ProductsList />} />
            <Route path=":id" element={<Product />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
