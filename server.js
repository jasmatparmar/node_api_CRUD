const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/productModel")
const Register = require("./models/productModel")
const app = express()
const jwt = require('jsonwebtoken');

const secretKey = 'mynameisjasmatparmarfullstackdeveloper' ;

app.use(express.json())

app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

//route
app.get("/", (req, res) => {
    res.send('Hello node Api New1')
})

app.get('/products', async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        const updateById = await Product.findById(id);
        res.status(200).json(updateById)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ message: `cannot find product by ID ${id}` })
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post("/products", async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
})


// Register API
app.post("/registers", async (req, res) => {
    try {
        const register = await Register.create(req.body)
        res.status(200).json(register)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
})

app.get("/register/:id", async (req, res) => {
    try {
        const { id } = req.params
        const register = await Register.findById(id);
        res.status(200).json(register)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.delete("/register/:id", async (req, res) => {
    try {
        const { id } = req.params
        const register = await Register.findByIdAndDelete(id);
        if(!register){
            return res.status(404).json({message: `cannot find product by ID ${id}`});
        }
        res.status(200).json(register)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/login', async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await Register.findOne({ userId });
        console.log(user, 'req.body');
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        if (password !== user.password) {
            return res.status(401).json({ error: 'Please enter correct password' });
        }
        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1h'
        });
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// const createToken = async (data) =>{
//     console.log(data, 'data');
//     const options = { expiresIn: '1h' };
//     const secretKey = 'mynameisjasmatparmarfullstackdeveloper' ;
//     const token = await jwt.sign(data.toJSON(), secretKey)

//     console.log(token, 'token');

//     const tokenVer = await jwt.verify(token, 'mynameisjasmatparmarfullstackdeveloper');
//     console.log(tokenVer, 'tokenVer');
// }


mongoose.connect('mongodb+srv://jasmatptridhyatech:Admin12345@nodeapi.j3beaoa.mongodb.net/')
    .then(() => {
        app.listen(3000, () => {
            console.log(`API running on port 3000`)
        })
        console.log('connected to MongoDb');
    }).catch((error) => {
        console.log(error);
    })