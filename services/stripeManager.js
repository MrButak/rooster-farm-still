import Stripe from "stripe";
import dotenv from "dotenv"; dotenv.config();

async function createStripePaymentIntent() {
    
    var stripe = new Stripe(process.env.STRIPE_SK, null);

    const paymentIntent = await stripe.paymentIntents.create({

        amount: 100 * 100, // in cents
        currency: "usd",
        receipt_email: 'mspence5555@gmail.com',
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
                postal_code: '38422',
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
