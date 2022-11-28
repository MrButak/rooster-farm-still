<template>

<div id="formMainWrapper">
    <!-- Display a payment form -->
    <form id="payment-form">
        <div id="payment-element">
            <!--Stripe.js injects the Payment Element-->
        </div>
        <button @click.prevent="handleSubmitPayment()" id="submit">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text">Pay now</span>
        </button>
        <div id="payment-message" class="hidden"></div>
    </form>
</div> 
<p style="text-align: center;">Site still in development</p>
<!-- <p>Successful payment</p>
<p>4242424242424242</p>
<br />
<p>Failed payment</p>
<p>4000000000009995</p>
<br />
<p>Requires authentication</p>
<p>4000002500003155</p>
<br /> -->

</template>



<script setup>

import { onMounted, computed } from 'vue';
import { 
        useOrderStore,
        // userShippingData, userProductsToShip, subTotal 
    } from '../../services/stateStore';

// Pinia store
const orderStore = useOrderStore();

const config = useRuntimeConfig();

let stripe;
let elements = {};

onMounted(() => {
    // Consider a try/catch here. That way if for some reason the Strip script is not loaded (user refreshed page) I could send them back to /shopping-cart
    // stripe = window.Stripe(config.public.STRIPE_PK, null);
    // createPaymentIntent();
});

async function createPaymentIntent() {

    // Create an Object to send as meta data to Stripe. After a successful payment, I use this to update the DB, and display/send an order conformation
    let purchasedItemsObj = {};
    orderStore.userProductsToShip.forEach((product) => {
        purchasedItemsObj[product.id] = {
            'name': product.name,
            'price': product.price,
            'quantity': product.quantity
        };
    });

    // Make a payment to Stripe and get the Stripe client secret
    let clientSecret = await $fetch(`${config.public.BASE_URL}/api/create-payment-intent`, {
        method: 'POST',
        body: JSON.stringify({
            shipping: orderStore.userShippingData,
            products: purchasedItemsObj,
            subtotal: orderStore.subTotal
        })
    });

    // Render the payment form using the client secret
    const appearance = {
        theme: 'stripe',
    };
    elements = stripe.elements({ appearance, clientSecret });
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
};

async function handleSubmitPayment() {

    return; // Toggle stripe payment
    // turn loading spinner on
    setLoading(true);
    
    const { error } = await stripe.confirmPayment({
        
        elements,
        confirmParams: {

            // shipping: 
            // redirect to payment completion page
            return_url: `${config.public.BASE_URL}order-success`//'http://localhost:3000/order-success',
        },
    });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
    } 
    else {
        showMessage("An unexpected error occured.");
    }
    setLoading(false);
};

// UI helper functions

// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } 
    
    else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
};
// User inputed error
function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");
    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;
    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.textContent = "";
    }, 8000);
};


let testCssVariable = computed(() => {
    return 'green'
})
</script>
<style lang="scss" scoped>

// TODO: Add CSS variables for some of the form colors. In dark mode it is hard to see some elements. Make the color variable a computed property based on light/dark theme
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
}
#formMainWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 1rem;
}

form {

    background-color: white;
    width: 100%;
    // max-width: 45rem;
    padding: 10px 20px 20px 10px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
}
.hidden {
  display: none;
}
#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}
#payment-element {
  margin-bottom: 24px;
}
/* Buttons and links */
button {
  background: #ffd166; // vuestic colors.presets.light.primary
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}
button:hover {
  filter: contrast(115%);
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}
/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}
.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.spinner:before,
.spinner:after {
  position: absolute;
  content: "";
}
.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}
.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}
@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
// @media only screen and (max-width: 600px) {
//   form {
//     width: 80vw;
//     min-width: initial;
//   }
// }
@media only screen and (min-width: 640px)  {
    #payment-form {
        width: 80%;
    }
}

@media only screen and (min-width: 1024px)  {
    #payment-form {
        width: 48rem;
    }
}
</style>
