import { stripeWebHooks } from '../../services/stripeManager.js';

export default defineEventHandler (async event => {
    
    const body = await useRawBody(event)
    const stripeSignature = event.req.headers['stripe-signature'];
    stripeWebHooks(stripeSignature, body);
});