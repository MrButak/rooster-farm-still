import { createStripePaymentIntent } from '../../services/stripeManager.js';

export default defineEventHandler (async event => {
    
    let paymentIntent = await createStripePaymentIntent();
    return paymentIntent.client_secret;  
});
