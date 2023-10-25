import { useState } from 'react';
import './AddProduct.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AddProduct(){
    const [name , setName] = useState('');
    const [brand , setBrand] = useState('');
    const [price , setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productImage , setProductImage] = useState('');

   const addProduct = async () => {
     if(!name || !brand || !price || !description || !productImage ) {
        alert('Please enter all fields')
        return
      }
   
      const product = {
      name,
      price,
      brand,
      description,
      productImage
      }
     
      const response = await axios.post('/product' , product)
      
      alert(response.data.message);

      setName('');
      setBrand('');
      setDescription('');
      setPrice('');
      setProductImage('');
   };

return(
<form className='input-form'>
    <input type='text'
    className='input-type'
    placeholder='Name Of Product'
    value={name}
   onChange={(e)=> {
    setName(e.target.value)
   }}
    />


<input type='text'
    className='input-type'
    placeholder='Description'
    value={description}
   onChange={(e)=> {
    setDescription(e.target.value)
   }}
    />

    
<input type='text'
    className='input-type'
    placeholder='Brand Of Product'
    value={brand}
   onChange={(e)=> {
    setBrand(e.target.value)
   }} 
    />

<input type='text'
    className='input-type'
    placeholder='Price'
    value={price}
   onChange={(e)=> {
    setPrice(e.target.value)
   }}
    />

<input type='text'
    className='input-type'
    placeholder='URL Of Product Image'
    value={productImage}
   onChange={(e)=> {
    setProductImage(e.target.value)
   }}
    />

<button type='button' 
className='add-btn input-type'
onClick={addProduct}>
Add Product
</button>
<Link to={'/'} className='go-back-link'> Go Back </Link>

</form>
)

}
















































































































