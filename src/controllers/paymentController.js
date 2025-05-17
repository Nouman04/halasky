const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = {

    getPaymentDetail :async (request , response) => {
        const { amount } = request.body;
        paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'sar',
            automatic_payment_methods: {
                enabled: true,
            },
        })

        return response.status(200).json({
            token : paymentIntent.client_secret
        });
    }
}
