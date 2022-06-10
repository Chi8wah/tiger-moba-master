const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const schema = new mongoose.Schema({
    viewedid: {
        type: String
    },
    time: {
        type: Date
    },
    type: {
        type: String
    },
})

module.exports = mongoose.model('Tea', schema)