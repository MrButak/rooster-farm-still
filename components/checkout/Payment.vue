<template>
    <!-- Stripe injects a payment form here -->
    <form id="payment-form">
        <div id="payment-element">
        </div>
    </form>

    

</template>



<script setup>


const config = useRuntimeConfig();

let stripe;
let elements = {};

onMounted(() => {
    stripe = window.Stripe(config.public.STRIPE_PK, null);
    createPaymentIntent();
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

</script>



<style lang="scss" scoped>



</style>
