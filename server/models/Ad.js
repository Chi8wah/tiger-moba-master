const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const schema = new mongoose.Schema({
    name: { type: String },
    items: [{
      image: { type: String },
      url: { type: String },
    }]
})
module.exports = mongoose.model('Ad', schema)