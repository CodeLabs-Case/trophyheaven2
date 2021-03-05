const Stripe = require('stripe')("sk_test_51HXS4rK5Vrvx7bpuohfQCnByA2rkb3eBKNt30HqkFpv2rdaLjnbBnIe1zGfwxH34WleQQvqnKpsZ8ZgfkOYYzF8x00wDFHqxyx")

module.exports = {
    __createToken: function(req, res){

        var card = {
            number: req.body.number,
            exp_month: req.body.expmonth,
            exp_year: req.body.expyear,
            cvc: req.body.cvc
        }
        StripeModule.tokens.create({card}, function(err, data){
            res(err, data)
        })
    },

    __createCharge: function(req, res) {
        var charge = {
            amount: req.body.amount * 100,
            currency: 'usd',
            source: req.body.token,
            description: req.body.description
        }

        StripeModule.charges.create(charge, function(err, data){
            res(err, data)
        })
    }

}