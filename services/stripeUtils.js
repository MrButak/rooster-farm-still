import Stripe from "stripe";

async function createStripePaymentIntent() {

    var stripe = new Stripe('xxxxx', null);
    const paymentIntent = await stripe.paymentIntents.create({

        amount: 100 * 100, // in cents
        currency: "usd",
        receipt_email: 'xxxxx',
        description: "Still order",
        metadata: {
            
            'purchasedItems': '50 gal still'
        },
        shipping: {
            address: {
                city: 'xxxxxx',
                country: 'usa',
                line1: 'some data',
                line2: 'some data',
                postal_code: '38472',
                state: 'tn'
            },
            name: 'billy',
            phone: null
        },
        automatic_payment_methods: {
            enabled: true,
        },
    });
    
    
    return paymentIntent;
}

export { createStripePaymentIntent }
