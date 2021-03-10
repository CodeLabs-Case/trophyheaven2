require('dotenv')
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(stripeSecretKey)


const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'trophyheavenllc@gmail.com',
      pass: (process.env.EMAIL_PASSWORD).toString()
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

    var cart = req.body.cart
    var cartjson = JSON.parse(cart)
    var cartFormatted = ""

    cartjson.forEach(element => {
        cartFormatted += `
            <div style="margin-top: 1rem; margin-bottom: 1rem;">
                <strong>Item: </strong> ${element.title}<br>
                <strong>Description: </strong> ${element.description} ${element.size}<br>
                <strong>Price: </strong> $${element.price}<br>
                <strong>Quantity: </strong> ${element.amount}<br>
            </div>
        `
    });



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

    var worksAtIngersoll = req.body.checkbox
    if(worksAtIngersoll == "on"){
        worksAtIngersoll = "Yes"
    } else {
        worksAtIngersoll = "No"
    }



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
        res.render('/var/app/current/views/success.ejs') // If no error occurs 
    }) 
    .catch((err) => { 
        res.render('/var/app/current/views/error.ejs') // If some error occurs
    });
    


    var contents = fs.readFileSync('/var/app/current/public/scripts/confirmation.json')
    var confirmationJSON = JSON.parse(contents)
    var confirmationNumber = confirmationJSON.confirmationNumber



    // email sent to buyer
    var mailOptionsBuyer = {
        from: 'trophyheavenllc@gmail.com',
        to: `${req.body.stripeEmail}`,
        subject: `Order Confirmation #${confirmationNumber}`,
        html: `
            <div style="">
                <h2 style="color: #f09d51;"> Thank you for your purchase ${fname}! </h2>
                <br>
                <h3>Order Details:</h3>
                <br>
                <strong>Name: </strong>${fname} ${lname}
                <br>
                <strong>Shipping Address: </strong>${shippingAddress}, ${city}, ${state} ${zip}
                <br>
                <br>
                <h3>Products:</h3>${cartFormatted} 
                <strong>Total: </strong>$${parseFloat(total / 100).toFixed(2)}

                <br>
                <br>
                <br>
                <br>
                <div style="">
                    <span style="color: #f09d51; font-size: 16px;">Trophy Heaven</span><br>
                    <span style="color: #f09d51;">200 West Stanly Street, Stanfield, NC 28163</span>
                </div>
            </div>
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
        from: 'trophyheavenllc@gmail.com',
        to: `trophyheavenllc@gmail.com`,
        subject: `Order Confirmation #${confirmationNumber}`,
        html: `
            <div>
                <h2 style="color: #f09d51;">Order from ${req.body.stripeEmail} placed!</h2>
                <br>
                <h3>Order Details:</h3>
                <br>
                <strong>Name: </strong>${lname}, ${fname}
                <br>
                <strong>Shipping Address: </strong>${shippingAddress}, ${city}, ${state} ${zip}
                <br>
                <br>
                <strong>Ingersoll Employee (Charlotte)? </strong>${worksAtIngersoll}
                <br>
                <br>
                <h3>Products:</h3>${cartFormatted}
                <strong>Total: </strong>$${parseFloat(total / 100).toFixed(2)}

                <br>
                <br>
                <br>
                <br>
                <div style="">
                    <span style="color: #f09d51; font-size: 16px;">Trophy Heaven</span><br>
                    <span style="color: #f09d51;">200 West Stanly Street, Stanfield, NC 28163</span>
                </div>
            </div>
            `
    };
    transporter.sendMail(mailOptionsSeller, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    })



    // Update the confirmation number
    confirmationJSON.confirmationNumber = confirmationJSON.confirmationNumber + 1
    fs.writeFileSync('/var/app/current/public/scripts/confirmation.json', JSON.stringify(confirmationJSON))
})