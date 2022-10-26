import Stripe from "stripe";
import dotenv from "dotenv"; dotenv.config();

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
            
            'purchasedItems': 'this is the metadata'
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
        //return res.status(400).send(`Webhook Error: ${err.message}`);
    }
 
    // Successfully constructed event
    console.log('✅ Success:', event.id);

    switch (event.type) {

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;

            // dbManager.storePurchase(paymentIntent);
            // dbManager.updateMenuItmQty(paymentIntent);
            // emailManager.sendPaymentSuccessEmail(paymentIntent);
            console.log({paymentIntent})
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    // res.json({received: true});
};

export { createStripePaymentIntent, stripeWebHooks }
