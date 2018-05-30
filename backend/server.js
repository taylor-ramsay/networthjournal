const mongoose = require('mongoose')
const express = require('express'),
    bodyParser = require('body-parser')
    app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//Mongo DB
mongoose.connect('mongodb://localhost/NWJournalDB')

const db = mongoose.connection

db.on('open', ()=>{
    console.log("connected to mongodb")
})

const Account = require('./models/Account')
const MonthlyJournal = require('./models/MonthlyJournal')
const Valuation = require('./models/Valuation')

//Create new account
app.post('/add-account', (req,res)=>{
    let newAccount = Account(req.body)
    newAccount.save()
        .then(savedAccount=>{
            res.json(savedAccount)
        })
        .catch(error=>{
            console.log(error)
        })
})

//Port 8080
app.listen(8080, ()=>{
    console.log('server is live at 8080')
})
