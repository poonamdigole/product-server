import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function ProductDetail() {
    const { _id } = useParams();
    const [product, setProduct] = useState([]);
    const { name, brand, description, price, productImage } 
    = product;
    


    const loadProduct = async () => {
        const response = await axios.get(`/product/${_id}`);
        setProduct(response?.data?.data)

    }

    useEffect(() => {
        loadProduct();
    }, []);

    return (

        <div className='product-detail-card'>
            <h1>Product Detail</h1>
            <img src={productImage}/>
            <h2>Id : {_id} </h2>
            <h2>Product Name : {name}</h2>
            <h3>Brand : {brand}</h3>
            <p>{description}</p>    
            <h3>Rs. {price} /-</h3>
        </div>
    );
}