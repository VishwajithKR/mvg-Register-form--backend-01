const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = "mongodb+srv://Vishwa:vishwa@cluster0.wckof1g.mongodb.net/?retryWrites=true&w=majority"




const app = express();

app.use(express.json());


app.use(cors({
    origin: ("https://mvg-from-registation.onrender.com", "*")
}));


app.post('/users', async (req, res) => {
    try {
        let connection = await mongoClient.connect(url);
        let db = connection.db('mvg');
        let user = await db.collection('register').findOne({ email: req.body.email })
        if (user) {
            res.json({ message: "This Email Already Exist" })
        } else {
            let collection = await db.collection('register').insertOne(req.body)
            res.json({ message: "Successfully Submitted" })
        }
        let close = await connection.close()
        res.json({ message: "Success" })
    } catch (error) {
        console.log(error);
    }
})

app.get('/fullUsers', async (req, res) => {
    let connection = await mongoClient.connect(url);
    let db = connection.db('mvg');
    let user = await db.collection('register').find({}).toArray()
    let close = await connection.close()
    res.json(user)
})


app.listen(3088, () => {
    console.log("server is started in 3088")
})









