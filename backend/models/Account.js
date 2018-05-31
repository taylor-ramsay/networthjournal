const mongoose = require('mongoose');
        Schema = mongoose.Schema

const accountSchema = new Schema({
    balance: {
        type: Number,
        required: true
    },
    name: {
        unique: true,
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
    timeStamp: Date
})

const AccountModel = mongoose.model('Account', accountSchema)

module.exports = AccountModel