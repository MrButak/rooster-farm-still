<template>

<div class="order-summary-wrapper">
   
    <div v-if="productsLoaded" class="summary-wrapper">
        <h3>Your Order</h3>

        <table id="customers">
            <tr v-for="product in userProductsToShip">
                <td>
                    {{ product.name }} x {{ product.quantity }}
                </td>
                <td>
                    ${{ product.price * product.quantity }}
                </td>
            </tr>
            
            <tr>
                <td><h4>Subtotal</h4></td>
                <td><h4>${{ subTotal }}</h4></td>
            </tr>
            
        </table>

        
        <h3 class="shipping-information-header">Shipping Information</h3>
        <div class="shipping-information-wrapper">
            <p>{{ userShippingData.nameField }}</p>
            <p>{{ userShippingData.addressField1 }}</p>
            <p v-if="userShippingData.addressField2"> {{ userShippingData.addressField2 }}</p>
            <p>{{ userShippingData.cityField }} {{ userShippingData.regionField }}, {{ userShippingData.postalField }}</p>
            <p>{{ userShippingData.emailField }}</p>
        </div>

    </div>

</div>

</template>



<script setup>

import { onMounted } from 'vue';
import { userShippingData, currentCheckoutStep,
        userProductsToShip, subTotal
} from '../../services/stateStore';
import { localStorageAvailable, getItemFromLs } from '../../services/lsManager';
const router = useRouter();

let productsLoaded = ref(false);


// If the user has made it this far, and no LS available send them to the home page
let shoppingCart = getItemFromLs('RVSshoppingCart');
if(!shoppingCart || !localStorageAvailable()) { 
    currentCheckoutStep.value = 1;
};

// If shipping information is not in State, send the user back to fill out that info. This would happen if they started the checkout process, but refreshed the page
if(!userShippingData.nameField || !userShippingData.emailField ||
    !userShippingData.addressField1 || !userShippingData.cityField || 
    !userShippingData.regionField || !userShippingData.postalField ||
    !userShippingData.countryField) {
    currentCheckoutStep.value = 1;
};
    

onMounted(() => {
    
    (async() => {
        let productsDbData = await $fetch('/api/get-products');

        // Reset State
        userProductsToShip.length = 0;
        subTotal.value = 0;
        // Get prices from the DB, in case the user tampered with LS
        productsDbData.forEach((product) => {
            let shoppingCartIndex = shoppingCart.findIndex(prod => prod.id == product.id);
            if(shoppingCartIndex != -1) {
                product.quantity = shoppingCart[shoppingCartIndex].quantity;
                subTotal.value += parseInt(product.quantity) * parseInt(product.price);
                userProductsToShip.push(product);
            };
        });
        productsLoaded.value = true;
    })();
    
});

</script>



<style lang="scss" scoped>

.order-summary-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;

    .summary-wrapper {
        width: 100%;
        max-width: 45rem;
        padding: 10px 20px 20px 10px;
    }
    .shipping-information-header {
        padding: 2rem 0 0 0;
    }
    .shipping-information-wrapper {
        border: 1px solid #ddd;
        padding: 8px;
    }
    h3 {
        padding: 0 0 .4rem 0;
    }
    p {
        padding: 2px;
    }
}

#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
}

@media (min-width: 1023px) {
    .checkout-nav-button-wrapper {
        padding: 10px 0 0 0;
    }
}
</style>
