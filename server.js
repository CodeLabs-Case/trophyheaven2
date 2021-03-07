// These will be set inside the hosting environment in Amazon Web Services in the production application
require('dotenv')
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
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
    
    // Transaction information
    var total = req.body.total
    total = parseInt(total, 10)
    
    // Buyer information
    var fname = req.body.fname
    fname = fname.toString()
    
    var lname = req.body.lname
    lname = lname.toString()
    
    var shippingAddress = req.body.shippingAddress
    shippingAddress = shippingAddress.toString()
    
    var city = req.body.city
    city = city.toString()
    
    var state = req.body.state
    state = state.toString()
    
    var zip = req.body.zip
    zip = zip.toString()



    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: `${fname} ${lname}`, 
        address: { 
            line1: `${shippingAddress}`, 
            postal_code: `${zip}`, 
            city: `${city}`, 
            state: `${state}`, 
            country: `United States`,
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: total,
            description: '', 
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
    
    

    

    // email sent to buyer
    var mailOptionsBuyer = {
        from: 'davis.architect99@gmail.com',
        to: `${req.body.stripeEmail}`,
        subject: 'Order Confirmation and Receipt',
        text: `
            <h1> Thank you for your purchase! </h1>
            This is a confirmation of your order totaling: $${total / 100}!
            `
    };
      
    transporter.sendMail(mailOptionsBuyer, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    })

    // email sent to seller
    var mailOptionsSeller = {
        from: 'davis.architect99@gmail.com',
        to: `davis.architect99@gmail.com`,
        subject: 'Order Confirmation',
        text: `
            <h1> Order from ${req.body.stripeEmail} placed! </h1>    
            <br>
            Name: ${lname}, ${fname}
            <br>
            Shipping Address: ${shippingAddress}, ${city}, ${state} ${zip}
            <br>
            The checkout is being processed totaling: $${total / 100}!
            `
    };
    
    transporter.sendMail(mailOptionsSeller, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    })
})