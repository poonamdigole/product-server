import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './views/Home/Home.js';
import AddProduct from './views/AddProduct/AddProduct';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter ([
  {
    path:'/',
    element:<Home/>
  },

  {
    path:'/add-product',
    element:<AddProduct />
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);