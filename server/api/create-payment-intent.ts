import { createStripePaymentIntent } from '../../services/stripeUtils';

export default defineEventHandler (async event => {
    
    let paymentIntent = await createStripePaymentIntent();
    return paymentIntent.client_secret;  
});
