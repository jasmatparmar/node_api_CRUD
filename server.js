const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/productModel")
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

//route
app.get("/", (req, res) =>{
    res.send('Hello node Api New1')
} )

app.get('/products', async(req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updateById = await Product.findById(id);
        res.status(200).json(updateById)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return res.status(404).json({message: `cannot find product by ID ${id}`})
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post("/products", async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://jasmatptridhyatech:Admin12345@nodeapi.j3beaoa.mongodb.net/')
.then(() => {
    app.listen(3000, () => {
        console.log(`API running on port 3000`)
    })
    console.log('connected to MongoDb');
}).catch((error) => {
    console.log(error);
})