const express = require('express')

const app = express()

app.use('/static', express.static('public'));

app.use(require('./routes'))

const port = process.env.port || 3000

app.listen(port, (err) => {
    if(err) {
        console.log(err)
    }
    console.log("Server is live")
})