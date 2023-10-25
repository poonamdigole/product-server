import './Home.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const response = await axios.get('/products');
        setProducts(response?.data?.data);

    }

    const DeleteBtn = async (_id) => {
        const response = await axios.delete(`/product/${_id}`);
        alert(response?.data?.message)
        loadProducts();
    }

    useEffect(() => {
        loadProducts();
    }, []);


    return (
        <>
            <h1 className='text-align'>All Products</h1> 
            <Link to={'/add-product'} className='add-product-link' >Add Product </Link>
        
            <div  className='product-container'>
                {
                    products?.map((product, index) => {
                        const { name, brand, description, price, productImage, _id } 
                          = product;
                        return (
                          
                                <div className='product-card'>
                            
                                    <img src={productImage} className='product-img'/>
                                    <h2> {name}</h2>
                        
                                    <h3>Rs. {price} /-</h3>
                                    <Link to={`/product-detail/${_id}`} 
                                     className='' >View more </Link>
                                    <Link to={`/product-update/${_id}`} 
                                     className='edit-btn' >Edit </Link>
                            

                                    <i className="fa-solid fa-trash delete-icon" 
                                     onClick= 
                                   {
                                    ()=>{DeleteBtn(_id)}
                                    } ></i>
                                   
                                </div>
                        )
                    })
                }
            </div>
        </>
    )


}