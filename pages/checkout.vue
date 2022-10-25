<template>

<div class="checkout-wrapper-main">
    <CheckoutStepHeader />
    <AddressForm />
    <button @click="createPaymentIntent">init payment</button>
    
    <!-- Strip injects a payment form here -->
    <form id="payment-form">
        <div id="payment-element">
        </div>
    </form>

</div>

</template>



<script setup>
import AddressForm from '~~/components/checkout/AddressForm.vue';

const config = useRuntimeConfig();


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
    