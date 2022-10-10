<template>
<Script src="https://js.stripe.com/v3/"></Script>
<div>

    <!-- <Script src="https://js.stripe.com/v3/"></Script> -->
    <button @click="createPaymentIntent">init payment</button>
    <button @click="testDbCall">test DB</button>
    
    <!-- Strip injects a payment form here -->
    <form id="payment-form">
        <div id="payment-element">
        </div>
    </form>

</div>

</template>



<script setup>

import { shoppingCart } from '../services/stateStore.js';
const config = useRuntimeConfig();


let stripe;
let elements = {};

onMounted(() => {
    stripe = window.Stripe(config.public.STRIPE_PK, null)
});

async function createPaymentIntent() {

    let clientSecret = await $fetch('/api/create-payment-intent');
    
    const appearance = {
        theme: 'stripe',
    };

    elements = stripe.elements({ appearance, clientSecret });
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
};

async function testDbCall() {
    let testData = await $fetch('/api/test-db');
    console.log(testData);
};

</script>



<style scoped>

#formMainWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
}

#payment-element {
    margin-bottom: 24px;
}

</style>
    