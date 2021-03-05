// These will be set inside the hosting environment in Amazon Web Services in the production application
require('dotenv')
const stripeSecretKey = "sk_test_51HXS4rK5Vrvx7bpuohfQCnByA2rkb3eBKNt30HqkFpv2rdaLjnbBnIe1zGfwxH34WleQQvqnKpsZ8ZgfkOYYzF8x00wDFHqxyx"
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
// const stripe = require('stripe')(stripeSecretKey)
const Stripe = require('./stripe.js')


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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

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

app.get('/checkout', (req, res) => {
    const subtotal = req.body.subtotal
    
    res.render('/var/app/current/views/checkout.ejs', {key: stripePublicKey, subtotal: subtotal})
})

app.post('/payment', (req, res) => {

    // Create and send the payment
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

app.post('/create-token', (req, res) => {
    Stripe.__createToken(req.body, function(err, result){
        if(err){
            res.send(err)
        } else {
            res.send({
                "message": "Token Generated",
                "data": result
            })
        }
    })
})

app.post('/create-charge', (req, res) => {
    Stripe.__createCharge(req.body, function(err, result){
        if(err) {
            res.send(err)
        } else {
            res.send({
                "message": "Charged",
                "data": result
            })
        }
    })
})