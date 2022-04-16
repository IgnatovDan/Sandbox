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
import React, { useState } from 'react';
import CurrentCustomerIdContext from './contexts/CurrentCustomerIdContext';

function App() {
  const [customerId, setCustomerId] = useState();
  return (
    <CurrentCustomerIdContext.Provider value={ { customerId, setCustomerId } }>
      Current customer: { customerId ? JSON.stringify(customerId) : 'not selected' }
      <BrowserRouter>
        <Navigation />
        <Routes>
          {/* TODO: review useRoutes */ }
          <Route path="/" element={<Outlet />}>
            <Route index element={<HomeRoute />}></Route>
            <Route path={AppRoutes.customersPath} element={<CustomersRoute />}>
              <Route index element={<CustomersList />} />
              <Route path={AppRoutes.idPath} element={<Customer />} />
            </Route>
            <Route path={AppRoutes.productsPath} element={<ProductsRoute />}>
              <Route index element={<ProductsList />} />
              <Route path={AppRoutes.idPath} element={<Product />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CurrentCustomerIdContext.Provider>
  );
}

export default App;
