// These will be set inside the hosting environment in Amazon Web Services in the production application
require('dotenv')
const stripeSecretKey = "sk_test_51HXS4rK5Vrvx7bpuohfQCnByA2rkb3eBKNt30HqkFpv2rdaLjnbBnIe1zGfwxH34WleQQvqnKpsZ8ZgfkOYYzF8x00wDFHqxyx"
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(stripeSecretKey)

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

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

    res.render('/var/app/current/views/index.ejs', {key: stripePublicKey})
})

app.post('/payment', (req, res) => {
    testMe()
    stripe.customers.create({
        email: "davis.architect99@gmail.com",//req.body.stripeEmail
        source: req.body.stripeToken,
        name: "Andrew Davis",
        address: {
            line1: " Buyer's Address",
            postal_code: "Buyer's Zip Code",
            city: "Buyer's City",
            state: "Buyer's State",
            country: "United States"
        }
    })
    .then(cusomter => {
        return stripe.charges.create({
            amount: purchaseClicked(),
            description: "",
            currency: 'USD',
            customer: cusomter.id
        })
    })
    .then(charge => {
        res.send('Success')
    })
})