<template>

<h2>
    Order Success !
</h2>
<p>e-mail receipt sent</p>

</template>



<script setup>

const config = useRuntimeConfig();
let stripe;

onMounted(() => {
    stripe = window.Stripe(config.public.STRIPE_PK, null);
    checkStatus();
});

// Fetches the payment intent status after payment submission from URL.
// A webhook on the backend receives the same paymentIntent Object, updates the item quantity in the DB, and sends a conformation email
async function checkStatus() {

    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );
    console.log({clientSecret})
    if (!clientSecret) {
        return;
    }
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    console.log({paymentIntent})
    switch (paymentIntent.status) {
        case "succeeded":
            console.log("Payment succeeded!");
            break;
        case "processing":
            console.log("Your payment is processing.");
            break;
        case "requires_payment_method":
            console.log("Your payment was not successful, please try again.");
            break;
        default:
            console.log("Something went wrong.");
            break;
    }
};

</script>



<style lang="scss">



</style>
