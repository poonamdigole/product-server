import { useState } from 'react';
import './AddProduct.css';
import axios from 'axios';

export default function AddProduct(){
    const [name , setName] = useState('');
    const [brand , setBrand] = useState('');
    const [price , setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productImage , setProductImage] = useState('');

   const addProduct = async () => {
     if(!name || !brand || !price || !description ) {
        alert('Please enter all fields')
        return
      }
   
      const product = {
      name,
      price,
      brand,
      description
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
    placeholder='Enter name of product'
    value={name}
   onChange={(e)=> {
    setName(e.target.value)
   }}
    />

<input type='text'
    className='input-type'
    placeholder='Enter brand of product'
    value={brand}
   onChange={(e)=> {
    setBrand(e.target.value)
   }} 
    />

<input type='text'
    className='input-type'
    placeholder='Enter description'
    value={description}
   onChange={(e)=> {
    setDescription(e.target.value)
   }}
    />

<input type='text'
    className='input-type'
    placeholder='Enter price'
    value={price}
   onChange={(e)=> {
    setPrice(e.target.value)
   }}
    />

<button type='button' 
className='add-btn input-type'
onClick={addProduct}>
Add Product
</button>


</form>
)

}
















































































































