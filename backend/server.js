const mongoose = require('mongoose')
    Schema = mongoose.Schema;
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

//Update account
app.put('/edit-account/:accountId', (req, res)=>{
    console.log(req.body)
    __object = req.body
    let accountToUpdate = {"accountId": req.params.accountId}
    console.log(accountToUpdate)
    let update = {
        balance: __object.balance,
        name: __object.name,
        type: __object.type,
        subType: __object.subType,
        date: __object.date,
        timeStamp: __object.timeStamp,
        accountId: __object.accountId
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

//create a valuation
app.put('/add-valuation', (req,res)=>{
    let newValuation = Valuation({
        newBalance: req.body.newBalance,
        newDate: req.body.newDate,
        timeStamp: req.body.timeStamp,
        valuationId: req.body.valuationId
    })
    newValuation.save(function(err,val) {



    const mewtwoID = val.id;
        // then we get the shelter we want using .find or .findOne
    Account.findOne({accountId: req.body.accountId})
        .then(sandbox => {
            // once we have the shelter, we push the new kat id
            //  into the kittens array
            sandbox.valuations.push(mewtwoID);

            // then we call save on the shelter we just edited
            return sandbox.save()
        })
        .then(savedShelter => {
            console.log(savedShelter);
        })
        .catch(error => {
            console.log(error);
        })

        // console.log(val.id);

        // let accountToUpdate = {"accountId": req.body.accountId}
        // let update = Account({
        //     valuations: ['5b11ecdc334d8159bb8a8ef9']
        // })
        // Account.findOneAndUpdate(accountToUpdate, update, { new:true, runValidators:true })
        // .then(updatedAccount => {
        //     res.json(updatedAccount)
        // })
        // .catch(error => {
        //     console.log(error)
        //     res.status(400).json({error})
        // })
     })
})

app.put('/add-val-to-account', (req, res)=>{
    var user = db.accounts.findOne({accountId:"And"})
    __object = req.body
    let accountToUpdate = {"accountId": req.params.accountId}
    console.log(accountToUpdate)
    let update = {
        balance: __object.balance,
        name: __object.name,
        type: __object.type,
        subType: __object.subType,
        date: __object.date,
        timeStamp: __object.timeStamp,
        accountId: __object.accountId
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

//add a valuation to an account

//Port 8080
app.listen(8080, ()=>{
    console.log('server is live at 8080')
})
