const mongoose = require('mongoose')
Schema = mongoose.Schema;
const express = require('express'),
    bodyParser = require('body-parser')
app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080
const dev = app.get('env') !== 'production'
console.log(dev)

const db = mongoose.connection

db.on('open', () => {
    console.log("connected to mongodb")
})

const Account = require('./models/Account')
const MonthlyJournal = require('./models/MonthlyJournal')
const Valuation = require('./models/Valuation')

//Create new account
app.post('/add-account', (req, res) => {
    let newAccount = Account(req.body)
    console.log(newAccount)
    newAccount.save()
        .then(savedAccount => {
            res.json(savedAccount)
        })
        .catch(error => {
            console.log(error)
        })
})

//Get all valuations
app.get('/get-valuations', (req, res) => {
    Valuation.find({}).sort('newDate')
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            console.log(error)
        })
})

//Get accounts with valuations
app.get('/get-accounts', (req, res) => {
    Account.find({}).sort('type').populate({ path: 'valuations', options: { sort: { 'newDate': 1 } } })
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            console.log(error)
        })
})

//Edit account
app.put('/edit-account/:accountId', (req, res) => {
    console.log(req.body)
    __object = req.body
    let accountToUpdate = { "accountId": req.params.accountId }
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
    Account.findOneAndUpdate(accountToUpdate, update, { new: true, runValidators: true })
        .then(updatedAccount => {
            res.json(updatedAccount)
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({ error })
        })
})

//create a valuation and assign to account
app.post('/add-valuation', (req, res) => {
    let newValuation = Valuation({
        newBalance: req.body.newBalance,
        newDate: req.body.newDate,
        timeStamp: req.body.timeStamp,
        valuationId: req.body.valuationId,
        accountId: req.body.accountId
    })
    newValuation.save(function (err, val) {
        const valuationId = val.id;
        Account.findOne({ accountId: req.body.accountId })
            .then(addVal => {
                addVal.valuations.push(valuationId);
                return addVal.save()
            })
            .then(savedVal => {
                res.json(savedVal)
            })
            .catch(error => {
                console.log(error);
            })
    })
})

//Edit valuation
app.put('/edit-valuation/:accountId', (req, res) => {
    __object = req.body
    let valuationToUpdate = { $and: [{ "accountId": req.params.accountId }, { "newDate": __object.newDate }] }
    let update = {
        accountId: __object.accountId,
        newBalance: __object.newBalance,
        newDate: __object.newDate,
        timeStamp: __object.timeStamp,
        valuationId: __object.valuationId
    }
    Valuation.findOneAndUpdate(valuationToUpdate, update, { new: true, runValidators: true })
        .then(updatedValuation => {
            res.json(updatedValuation)
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({ error })
        })
})

//Create new journal entry
app.post('/add-journal-entry', (req, res) => {
    console.log('hit!')
    let newJournal = MonthlyJournal(req.body)
    console.log(newJournal)
    newJournal.save()
        .then(savedJournal => {
            res.json(savedJournal)
        })
        .catch(error => {
            console.log(error)
        })
})

//Get all journal entrys
app.get('/get-journals', (req, res) => {
    MonthlyJournal.find({})
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            console.log(error)
        })
})

//Delete account
app.delete('/delete-account/:accountId', (req, res) => {
    let accountToDelete = { "accountId": req.params.accountId }
    Account.findOneAndRemove(accountToDelete)
        .then(removedAccount => {
            res.json(removedAccount)
        })
        .catch(err => {
            console.log(err);
        })
})

//Delete valuations
app.delete('/delete-valuations/:accountId', (req, res) => {
    console.log("DELETE VAL")
    let valuationToDelete = { "accountId": req.params.accountId }
    Valuation.remove(valuationToDelete)
        .then(removedValuations => {
            res.json(removedValuations)
        })
        .catch(err => {
            console.log(err);
        })
})

if (!dev) {
    console.log('Production')
    app.disable('x-powered-by')
    app.use(express.static(__dirname + '/frontend/build'));
    app.get('*', (req, res) => res.sendFile(__dirname + '/frontend/build/index.html'));
    mongoose.connect('mongodb://localhost/NWJournalDB')
}

if (dev) {
    console.log('Development')
    app.use(express.static(__dirname + '/frontend/public'));
    mongoose.connect('mongodb://localhost/NWJournalDB')
    //CORS
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    });
}

//Port 8080
app.listen(PORT, () => {
    console.log("server listening on port", PORT);
});
