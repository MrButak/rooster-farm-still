<template>

<Header />

<div class="message-wrapper">

    <div v-if="paymentStatus == 'succeeded'">
        <p>Your payment has been processed and your Order placed.</p>
        <p>You will receive an Order Confermation and Receipt in your email shortly.</p>
        <p>Thank you for shopping with us.</p>
    </div>

    <div v-else-if="paymentStatus == 'requires_payment_method'">
        <p>Your payment was not successful, please try again.</p>
        <p>Return to<ul @click="router.push('/shopping-cart')">checkout</ul></p>
    </div>

    <div v-else-if="paymentStatus == 'processing'">
        <p>Your payment is being processed.</p>
        <p>Upon completion you will receive an Order Confermation and Receipt in your email.</p>
        <p>Thank you for shopping with us.</p>
    </div>

    <div v-else>
        <p>An error has occurred. Please check your email.</p>
    </div>

</div>

</template>



<script setup>

import { useUiStore } from '~~/services/stateStore';
const config = useRuntimeConfig();
const router = useRouter();

// Pinia store
const uiStore = useUiStore();

let paymentStatus = ref('');
let statusMessage = ref('');

let stripe;

// Load 3rd party script
useHead({
    script: {
        src: 'https://js.stripe.com/v3/',
        defer: false,
        async: false,
    }
});

// Since I can not use window.onload to determine if the 3rd party script has already loaded
// (because of the SSR) I can use process.client to determine if the page has fully loaded.
if(process.client) {
    // thirdPartyScriptsLoaded.value = true;
    uiStore.thirdPartyScriptsLoaded = true;
    stripe = window.Stripe(config.public.STRIPE_PK, null);
    checkStatus();
};

// Fetches the payment intent status after payment submission from URL.
// An endpoint on the backend receives the same paymentIntent Object, updates the item quantity in the DB, and sends a conformation email
async function checkStatus() {

    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );
    
    if (!clientSecret) {
        return;
    };

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    
    switch (paymentIntent.status) {
        case "succeeded":
            paymentStatus.value = 'succeeded';
            statusMessage.value = 'Payment succeeded'
            console.log("Payment succeeded!");
            break;
        case "processing":
            paymentStatus.value = 'processing';
            console.log("Your payment is processing.");
            break;
        case "requires_payment_method":
            paymentStatus.value = 'requires_payment_method';
            console.log("Your payment was not successful, please try again.");
            break;
        default:
            paymentStatus.value = 'error';
            console.log("Something went wrong.");
            break;
    };
};

</script>



<style lang="scss" scoped>

.message-wrapper {
    display: flex;
}

</style>
