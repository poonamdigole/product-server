import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './views/Home/Home.js';
import AddProduct from './views/AddProduct/AddProduct';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ProductDetail from './views/ProductDetail/ProductDetail';
import UpdateProduct from './views/UpdateProduct/UpdateProduct';


const router = createBrowserRouter ([
  {
    path:'/',
    element:<Home/>
  },

  {
    path:'/add-product',
    element:<AddProduct />
  }, 

  {
    path:'/product-detail/:_id',
    element:<ProductDetail />
  },

  {
    path:'/product-update/:_id',
    element:<UpdateProduct />
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);