import {model, Schema} from 'mongoose';

const productSchema = new Schema(
    {
    name : String,
    price : Number,
    description: String,
    brand : String,
    productImage: String
}
);

const Product = model('Product' , productSchema);

export default Product;