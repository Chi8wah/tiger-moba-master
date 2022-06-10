const express = require("express")


const app = express()

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.set('secret', 'i1i2ii31i31')


require('./routes/admin')(app)
require('./routes/web/index.js')(app)
require('./plugins/db.js')(app)


app.listen(3000, () => {
    console.log('http://localhost:3000');
})