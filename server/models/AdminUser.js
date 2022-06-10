const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    // select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
  auth: { type: Number },
})

module.exports = mongoose.model('AdminUser', schema)