// These will be set inside the hosting environment in Amazon Web Services in the production application
require('dotenv')
const stripeSecretKey = "sk_test_51HXS4rK5Vrvx7bpuohfQCnByA2rkb3eBKNt30HqkFpv2rdaLjnbBnIe1zGfwxH34WleQQvqnKpsZ8ZgfkOYYzF8x00wDFHqxyx"
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(stripeSecretKey)


const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'robotscandance456@gmail.com',
      pass: 'tyghbnrufjvm07!'
    }
})

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

    res.render('/var/app/current/views/index.ejs')
})

// app.get('/checkout', (req, res) => {
//     var subtotal = req.body.subtotal
//     var subtotal_int = parseInt(subtotal, 10)
//     console.log(subtotal)    
//     res.render('/var/app/current/views/checkout.ejs', {key: stripePublicKey, subtotal: subtotal_int})
// })

app.post('/payment', (req, res) => {
    var subtotal = req.body.subtotal
    subtotal = parseFloat(subtotal.toFixed(2))
    subtotal = parseInt(subtotal, 10)

    // Create and send the payment
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "Andrew Davis",
        address: {
            line1: "Buyer's Address",
            postal_code: "Buyer's Zip Code",
            city: "Buyer's City",
            state: "Buyer's State",
            country: "United States"
        }
    })
    .then(customer => {
        return stripe.charges.create({
            amount: 1000,
            description: "Cart Items",
            currency: 'USD',
            customer: cusomter.id
        })
    })
    .then(charge => {
        res.send('Success')
    })





    // Create and send the email
    var mailOptions = {
        from: 'robotscandance456@gmail.com',
        to: 'davis.gamer07@gmail.com, robotscandance456@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    })
})