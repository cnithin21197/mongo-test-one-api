const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const users = require('./models/users')

const dbURL = "mongodb+srv://nithinpiratez:Nit123Hin456@cluster0.3ak3a41.mongodb.net/mongo-test-one?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())

mongoose.set('strictQuery',false)
mongoose.connect(dbURL)

app.post('/put', async (req,res) => {
    const user = req.body
    const newUser = new users(user)
    await newUser.save()

    res.json("User Added")
})

app.get('/get',(req,res) => {
    users.find({},(err,result) => {
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

app.get('/',(req,res) => {
    res.send("Working")
})

app.listen(process.env.PORT || 3001,() => {
    console.log('Server is running...')
})