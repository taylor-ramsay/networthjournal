const mongoose = require('mongoose');
        Schema = mongoose.Schema

const accountSchema = new Schema({
    balance: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    subType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeStamp: Date.now
})

const AccountModel = mongoose.model('Account', accountSchema)

module.exports = AccountModel