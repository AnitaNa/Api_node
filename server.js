require("dotenv").config(); 
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

app.use(express.json());
// routes
app.get('/', (req, res) => {
    res.send('Hello API');
})
app.get('/products', async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }catch(err){
        res.status(500).json({message: err.message})
    }
} );
app.get('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({message: err.message});
    }
})
app.post('/products', async (req, res) => {
    try{
        const products = await Product.create(req.body)
        res.status(200).json(products);
    } catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message});
    }
})

// update product
app.put('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `can not find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    }catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message});
    }
});

// Remove product

app.delete('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndRemove(id)
        if(!product){
            return res.status(404).json({message: `can not find any product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message});
    }
})

// Database connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('connecting to mangoDB')
    app.listen(3000, () => console.log('Node APi app is running on port 3000'));
})
.catch((err) => console.log(err));


