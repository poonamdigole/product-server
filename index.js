import express from 'express';
import mongoose from 'mongoose';
import Product from './models/product.js';


import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(express.json());

const PORT = 5000;



const connectMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    if (conn) {
        console.log('MongoDB connected Sucessfully');
    }
    else {
        console.log('MongoDB not connected');
    }
}
connectMongoDB();


app.get('/health', (req, res) => {
    res.json({ status: "All Good!" })
});

// get product data (storage~)
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(
        {
            success: true,
            data: products,
            message: 'sucessfully fetch all products'
        })
});

// create product data
app.post('/product', async (req, res) => {
    const { name, description, price, brand, productImage } = req.body;

    if (!name) {
        return res.json(
            {
                sucess: false,
                message: 'Name is required'
            }
        )
    }

    if (!description) {
        return res.json(
            {
                sucess: false,
                message: 'description is required'
            }
        )
    }

    if (!brand) {
        return res.json(
            {
                sucess: false,
                message: 'brand is required'
            })
    }

    if (!price) {
        return res.json(
            {
                sucess: false,
                message: 'price is required'
            })
    }



    const newProduct = new Product({
        name: name,
        description: description,
        brand: brand,
        price: price,
        productImage: productImage,
    })

    const savedProduct = await newProduct.save();

    res.json({
        success: true,
        data: savedProduct,
        message: 'successfully added new product'
    })
});


// find product data
app.get('/product', async (req, res) => {
    const { name } = req.query;

    const product = await Product.findOne({ name: name })

    if (product == null) {
        return res.json({
            success: false,
            message: 'found not product'
        })
    }

    res.json({
        success: true,
        data: product,
        message: 'Sucessfully found product'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});
