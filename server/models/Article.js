const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const schema = new mongoose.Schema({
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    title: {
        type: String
    },
    body: {
        type: String
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Article', schema)