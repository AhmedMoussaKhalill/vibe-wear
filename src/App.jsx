import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminProduct from './adminproduct/Page';
import AddProduct from './adminproduct/pages/AddProduct';
import EditProduct from './adminproduct/pages/EditProduct'
import ViewProduct from './adminproduct/pages/ViewProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin-product/*" element={<AdminProduct />} />
        <Route path="/admin-product/add-product" element={<AddProduct />} />
        <Route path="/admin-product/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin-product/view-product/:id" element={<ViewProduct />} />

        </Routes>
    </Router>

    
  );
}


export default App;

