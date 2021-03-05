// These will be set inside the hosting environment in Amazon Web Services in the production application
require('dotenv')
const stripeSecretKey = "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"
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

    res.render('/var/app/current/views/index.ejs', {key: stripePublicKey})
})


app.post('/payment', function(req, res){
    var subtotal = req.body.subtotal
    subtotal = parseFloat(subtotal).toFixed(2)
    subtotal = parseInt(subtotal, 10)

    var email = req.body.email
    email = email.toString()

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Gautam Sharma', 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '110092', 
            city: 'New Delhi', 
            state: 'Delhi', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: subtotal,    // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'USD', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Success") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    });
    
    



    var mailOptions = {
        from: 'robotscandance456@gmail.com',
        to: `${email}, robotscandance456@gmail.com`,
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