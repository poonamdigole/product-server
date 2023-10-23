import './Home.css';
import axios from 'axios'
import { useState, useEffect } from 'react';

export default function Home() {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const response = await axios.get('/products');
        setProducts(response?.data?.data);

    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <h1 className='text-align'>All Products</h1>
        
            <div  className='product-container'>
                {
                    products?.map((product, index) => {
                        const { name, brand, description, price, productImage } 
                          = product;
                        return (
                          
                                <div className='product-card'>
                                    <h2>Product Name : {name}</h2>
                                    <h3>Brand : {brand}</h3>
                                    <p>{description}</p>    
                                    <h3>Rs. {price} /-</h3>
                                </div>
                        )
                    })
                }
            </div>
        </>
    )


}