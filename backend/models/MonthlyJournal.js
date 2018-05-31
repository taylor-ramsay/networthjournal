const mongoose = require('mongoose');
        Schema = mongoose.Schema

const monthlyJournalSchema = new Schema({
    entry: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeStamp: Date
})

const MonthlyJournalModel = mongoose.model('MonthlyJournal', monthlyJournalSchema)

module.exports = MonthlyJournalModel