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
    console.log("endpoint hit!")
    let newAccount = Account(req.body)
    console.log(newAccount)
    newAccount.save()
        .then(savedAccount=>{
            res.json(savedAccount)
        })
        .catch(error=>{
            console.log(error)
        })
})

//Get all accounts
app.get('/get-accounts', (req,res)=>{
    Account.find({})
    .then(results=>{
        res.json(results)
    })
    .catch(error=>{
        console.log(error)
    })
})

//update account
app.put('/edit-account/:accountId', (req, res)=>{
    console.log(req.body)
    __object = req.body
    let accountToUpdate = {"_id":req.params.accountId}
    let update = {
        type: __object.type,
        subType: __object.subtype,
        name: __object.name,
        balance: __object.value,
        date: __object.date,
        timeStamp: __object.date
    }
    Account.findOneAndUpdate(accountToUpdate, update, { new:true, runValidators:true })
    .then(updatedAccount => {
        res.json(updatedAccount)
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({error})
    })
})

//Port 8080
app.listen(8080, ()=>{
    console.log('server is live at 8080')
})
