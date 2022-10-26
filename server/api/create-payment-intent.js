import { createStripePaymentIntent } from '../../services/stripeManager.js';

export default defineEventHandler (async event => {
    
    const body = await useBody(event)
    
    let paymentIntent = await createStripePaymentIntent(body.shipping, body.products, body.subtotal);
    return paymentIntent.client_secret;  
});
