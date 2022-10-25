<template>

<div class="checkout-wrapper-main">

    
    <CheckoutStepHeader />

    <span v-if="currentCheckoutStep == 1">
        <AddressForm />
        <!-- <button @click="createPaymentIntent">init payment</button> -->
        
        <!-- Strip injects a payment form here -->
        <form id="payment-form">
            <div id="payment-element">
            </div>
        </form>
    </span>

    <CheckoutNavBtns />
</div>

</template>



<script setup>

import { currentCheckoutStep } from '../services/stateStore';
import AddressForm from '~~/components/checkout/AddressForm.vue';

const config = useRuntimeConfig();

console.log(currentCheckoutStep.value)
let stripe;
let elements = {};

onMounted(() => {
    // stripe = window.Stripe(config.public.STRIPE_PK, null)
});

// async function createPaymentIntent() {

//     let clientSecret = await $fetch('/api/create-payment-intent');
    
//     const appearance = {
//         theme: 'stripe',
//     };

//     elements = stripe.elements({ appearance, clientSecret });
//     const paymentElement = elements.create("payment");
//     paymentElement.mount("#payment-element");
// };

</script>



<style lang="scss" scoped>

.checkout-wrapper-main {
    margin: 3rem 0 0 0;
};

</style>
    