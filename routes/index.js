const router = require('express').Router()

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

router.route("/").get((req, res, err) => {
    if(err) {
        console.log(err)
    }

    res.render('/var/app/current/views/index.ejs', { stripePublicKey: stripePublicKey })
})

module.exports = router