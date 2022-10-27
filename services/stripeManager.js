import Stripe from "stripe";
import dotenv from "dotenv"; dotenv.config();
import { storePurchase, updateProductQuantity, storeStripeChargeId } from './dbManager';
import { sendPaymentSuccessEmail } from './emailManager';

let stripe = new Stripe(process.env.STRIPE_SK, null);

let webhookSecret;

if(process.env.DEV_ENVIRONMENT == 'development') {
    webhookSecret = 'whsec_37f7f1684ac20431a347f5e09e6200e5c430ae11fbb62165ee230a58794e6226';
};
if(process.env.DEV_ENVIRONMENT == 'production') {
    webhookSecret = process.env.STRIPE_WH_SK;
};


async function createStripePaymentIntent(shipping, products, subtotal) {
    
    const paymentIntent = await stripe.paymentIntents.create({

        amount: subtotal * 100, // in cents
        currency: "usd",
        receipt_email: shipping.emailField,
        description: "Rooster Valley",
        metadata: {
            
            'itemsPurchased': JSON.stringify(products) // Must be under 500 character
        },
        shipping: {
            address: {
                city: shipping.cityField,
                country: shipping.countryField,
                line1: shipping.addressField1,
                line2: shipping.addressField2,
                postal_code: shipping.postalField,
                state: shipping.regionField
            },
            name: shipping.nameField,
            phone: null
        },
        automatic_payment_methods: {
            enabled: true,
        },
    });
    
    return paymentIntent;
};








function stripeWebHooks(stripeSignature, body) {
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(body, stripeSignature, webhookSecret);
    }
    catch (err) {
        console.log(`❌ Error message: ${err.message}`);
    };
 
    // Successfully constructed event
    console.log('✅ Success:', event.id);

    switch (event.type) {

        case 'payment_intent.created':
            console.log('✅ Success:', event.type);
            break;

        case 'payment_intent.succeeded':
            console.log('✅ Success:', event.type);
            // Get the payment intent Object
            const paymentIntent = event.data.object;
            // Get the items purchased from the payment intent Object
            let purchasedItems = JSON.parse(paymentIntent['metadata']['itemsPurchased']);
            // Loop through each item purchased and 
            //      1. add purchase to Db 
            //      2. update the products quantity in the DB
            Object.keys(purchasedItems).forEach((key) => {
                storePurchase(
                    [
                        key, 
                        purchasedItems[key].quantity, 
                        paymentIntent['receipt_email'], 
                        new Date(Date.now()), 
                        (purchasedItems[key].quantity * purchasedItems[key].price) * 100, // in cents 
                        paymentIntent['currency'], 
                        'stripe', 
                        paymentIntent['id']
                    ]
                );
                updateProductQuantity([key, purchasedItems[key].quantity]);
            });
            break;

        case 'charge.succeeded':
            console.log('✅ Success:', event.type);
            // Get the chargeSucceeded Object
            const chargeSucceeded = event.data.object;
            // Send a confirmation email to the user
            sendPaymentSuccessEmail(chargeSucceeded);
            // Store the charge id in the DB
            storeStripeChargeId([chargeSucceeded['id'], chargeSucceeded['payment_intent']]);
            break;

        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    // res.json({received: true});
};

export { createStripePaymentIntent, stripeWebHooks }
