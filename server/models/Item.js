const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    icon: {
        type: String
    },

})

module.exports = mongoose.model('Item', schema)