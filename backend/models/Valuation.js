const mongoose = require('mongoose');
        Schema = mongoose.Schema,
        ObjectId = Schema.Types.ObjectId

const valuationSchema = new Schema({
    account: {
        type: ObjectId,
        ref: 'Account',
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeStamp: Date
})

const ValuationModel = mongoose.model('Valuation', valuationSchema)

module.exports = ValuationModel