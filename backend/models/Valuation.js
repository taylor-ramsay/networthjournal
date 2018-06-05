const mongoose = require('mongoose');
        Schema = mongoose.Schema

const valuationSchema = new Schema({
    newBalance: {
        type: Number,
        required: true
    },
    newDate: {
        type: Date,
        required: true,
    },
    timeStamp: Date,
    valuationId: {
        type: String,
        required: true,
    }
})

const ValuationModel = mongoose.model('Valuation', valuationSchema)

module.exports = ValuationModel