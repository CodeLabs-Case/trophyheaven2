// These will be set inside the hosting environment in Amazon Web Services in the production application
require('dotenv')
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use('/static', express.static('public'));

app.set("viewengine", "ejs")

const port = process.env.port || 3000

app.listen(port, (err) => {
    if(err) {
        console.log(err)
    }
    console.log("Server is live")
})

app.get('/', (req, res) => {

    res.render('/var/app/current/views/index.ejs', {key, stripePublicKey})
})

app.post('/payment', (req, res) => {
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "",
        address: {
            line1: "",
            postal_code: "",
            state: "",
            country: ""
        }
    })
    .then(cusomter => {
        return stripe.charges.create({
            amount: 1000,
            description: "",
            currency: 'USD',
            customer: cusomter.id
        })
    })
    .then(charge => {
        res.send('Success')
    })
})