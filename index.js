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

// delete data
app.delete('/product/:_id', async (req, res) => {
    const { _id } = req.params;

    await Student.deleteOne({ _id : _id });

    res.json({
        success: true,
        data: {},
        msg: `Sucessfully deleted data with ${_id}`
    })
});

// PUT method (update entire data)
app.put('/product/:_id', async(req, res)=> {
    const { _id } = req.params;
    const {name, brand, description, price, productImage} = 
    req.body;

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


   await Product.updateOne(
        {_id:_id},
        { $set : {
            name: name,
            description: description,
            brand: brand,
            price: price,
            productImage: productImage,
            }
        }
    )

    const updatedProduct = await Product.findOne({_id:_id});

res.json({
    success: true,
    data : updatedProduct,
    msg: "Successfully updated"
}) 

});

// patch (we can update individiual data)
app.patch('/product/:_id', async(req, res) => {
    const { _id } = req.params;
    const {name, brand, description, price, 
         productImage} = req.body;

       const product = await Product.findById(_id);
   
       if(name)
      {
        product.name = name;
      }

       if(brand)
       {
        product.brand = brand;
       }

       if(description)
       {
        product.description = description;
       }

       if(price)
       {
        product.price = price;
       }

       if(productImage)
       {
        product.productImage = productImage;
       }

       const updatedProduct = await product.save();

       res.json({
           success: true,
           data : updatedProduct,
           msg: "Successfully updated"
       }) 

} )


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
