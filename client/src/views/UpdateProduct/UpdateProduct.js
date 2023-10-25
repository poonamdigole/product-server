import { useState, useEffect } from 'react';
import './UpdateProduct.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function UpdateProduct() {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productImage, setProductImage] = useState('');
    // const [product, setProduct] = useState([]);
    const { _id } = useParams();

    const loadProduct = async () => {
        const response = await axios.get(`/product/${_id}`);
        const {name, brand, description, price, productImage} = response?.data?.data;

        setName(name);
        setBrand(brand);
        setPrice(price);
        setProductImage(productImage);
        setDescription(description);


    }

    useEffect(() => {
        loadProduct();
    }, []);

    const updateProduct = async () => {
       
        const updatedProduct = {
            name,
            price,
            brand,
            description,
            productImage
        }

        const response = await axios.put(`/product/${_id} `, updatedProduct);


        alert(response?.data?.message);

        setName('');
        setBrand('');
        setDescription('');
        setPrice('');
        setProductImage('');
    };




    return (
        <form className='input-form'>
            <input type='text'
                className='input-type'
                placeholder='Name Of Product'
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />


            <input type='text'
                className='input-type'
                placeholder='Description'
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
            />


            <input type='text'
                className='input-type'
                placeholder='Brand Of Product'
                value={brand}
                onChange={(e) => {
                    setBrand(e.target.value)
                }}
            />

            <input type='text'
                className='input-type'
                placeholder='Price'
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
            />

            <input type='text'
                className='input-type'
                placeholder='URL Of Product Image'
                value={productImage}
                onChange={(e) => {
                    setProductImage(e.target.value)
                }}
            />

            <button type='button'
                className='add-btn input-type'
                onClick={updateProduct}>
                Update Product
            </button>
            <Link to={'/'} className='go-back-link'> Go Back </Link>

        </form>
    )

}
















































































































