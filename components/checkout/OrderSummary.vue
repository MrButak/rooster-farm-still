<template>
<div v-if="productsLoaded" class="va-table-responsive flex flex-col w-full align-center">
    <div class="w-full max-w-2xl">
        <h4 class="va-h4">Your Order</h4>
        <table class="va-table va-table--striped order-summary-table">
            <tbody>
                <tr v-for="product in orderStore.userProductsToShip">
                    <td>{{ product.name }} x {{ product.quantity }}</td>
                    <td class="va-text-right">${{ product.price * product.quantity }}</td>
                </tr>
                <tr>
                    <td><h6 class="va-h6">Subtotal</h6></td>
                    <td class="va-text-right"><h6 class="va-h6">${{ orderStore.subTotal }}</h6></td>
                </tr>
            </tbody>
        </table>
        <h4 class="va-h4">Shipping information</h4>
        <div class="va-text-block shipping-information-wrapper">
            <span>
                {{ orderStore.userShippingData.nameField }}<br />
                {{ orderStore.userShippingData.addressField1 }}<br />
                <span v-if="orderStore.userShippingData.addressField2"> 
                    {{ orderStore.userShippingData.addressField2 }}<br />
                </span>
                {{ orderStore.userShippingData.cityField }} {{ orderStore.userShippingData.regionField }}, {{ orderStore.userShippingData.postalField }}<br />
                {{ orderStore.userShippingData.emailField }}<br />
            </span>
        </div>
    </div>
</div>


</template>

<script setup>

import { onMounted } from 'vue';
import { useOrderStore } from '../../services/stateStore';
import { localStorageAvailable, getItemFromLs } from '../../services/lsManager';

// Pinia store
const orderStore = useOrderStore();

let productsLoaded = ref(false);

    
onMounted(() => {
    
    (async() => {
        let productsDbData = await $fetch('/api/get-products');

        // Reset State
        orderStore.userProductsToShip.length = 0;
        orderStore.subTotal = 0;
        // Get prices from the DB, in case the user tampered with LS
        productsDbData.forEach((product) => {
            let shoppingCartIndex = shoppingCart.findIndex(prod => prod.id == product.id);
            if(shoppingCartIndex != -1) {
                product.quantity = shoppingCart[shoppingCartIndex].quantity;
                orderStore.subTotal += parseInt(product.quantity) * parseInt(product.price);
                orderStore.userProductsToShip.push(product);
            };
        });
        productsLoaded.value = true;
    })();    
});

// If the user has made it this far, and no LS available send them to the home page
let shoppingCart = getItemFromLs('RVSshoppingCart');
if(!shoppingCart || !localStorageAvailable()) { 
    orderStore.currentCheckoutStep = 1;
};

// If shipping information is not in State, send the user back to fill out that info. This would happen if they started the checkout process, but refreshed the page
if(
    !orderStore.userShippingData.nameField || !orderStore.userShippingData.emailField ||
    !orderStore.userShippingData.addressField1 || !orderStore.userShippingData.cityField || 
    !orderStore.userShippingData.regionField || !orderStore.userShippingData.postalField ||
    !orderStore.userShippingData.countryField
) 
    { orderStore.currentCheckoutStep = 1 };

</script>



<style lang="scss">
.order-summary-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.order-summary-inner-wrapper {
    width: 100%;
    padding: 0 1rem;
}
.order-summary-table {
    width: 100%;
    border: 1px solid;
    tr {
        border: 1px solid;
    }
}
.shipping-information-wrapper {
    border: 1px solid;
}

@media only screen and (min-width: 640px)  {
    .order-summary-inner-wrapper {
        width: 80%;        
    }
}

@media only screen and (min-width: 1024px)  {
    .order-summary-inner-wrapper {
        width: 50rem;        
    }
}

</style>
