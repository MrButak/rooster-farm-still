<template>

<Header />

<!-- Remove item from cart popup modal -->
<va-modal
    v-model="showRemoveItemModal"
    @ok="removeItemFromShoppingCart"
    message="Remove item from cart?"
    blur
/>
<div class="mt-24 md:mt-44"></div>
<h1 class="va-h1 text-center">Shopping Cart</h1>
<div v-if="allProducts.length && shoppingCartItems.length" class="row row justify-center shopping-cart-products-wrapper">
    <div class="flex md6 lg4">
        <va-card>
        <!-- Loop through each product -->
        <span v-for="product in shoppingCartItems">
            <va-card-content>
                <h6 class="va-h6">{{ product.name }}</h6>
            </va-card-content>
            
            <va-card-actions align="between">
                <text>order quantity: {{ product.quantity }}</text>
                <va-counter
                    style="display: flex; flex-direction: row-reverse;"
                    @click:decrease-button="decrementCount(product)"
                    @click:increase-button="incrementCount(product)"
                    v-model="product.quantity"
                    :min="0"
                    outline
                    buttons
                    :flat="false"
                    margins="0"
                    rounded
                />
            </va-card-actions>

            <va-card-content>
                <text>left in stock: {{ calculateProductQuantityInStock(product.id, product.quantity) }}</text><br />
                <text>price: ${{ (product.price_in_cents / 100) * product.quantity }}</text>
            </va-card-content>
            
            <div class="my-5">
                <va-divider />
            </div>
        </span>

        <va-card-actions align="between">
            <h6 class="va-h6">Subtotal</h6>
            <h6 class="va-h6">${{ calculateSubtotal() }}</h6>
        </va-card-actions>

        <va-card-actions align="between">
            <p></p>
            <va-button 
                @click="router.push('/checkout')">
                Checkout
            </va-button>
        </va-card-actions>


        </va-card>
    </div>
</div>

<div 
    class="flex flex-col items-center mt-8" 
    v-else
    >
    <div 
        class="flex flex-col justify-center items-center gap-8 p-4"
    >
        <img 
            :src="emptyShoppingCartSvg"
            class="w-32"
        />
        <h4 class="va-h4 text-center">
            Your Cart Is Currently Empty!
        </h4>
        <p class="text-center">Before proceeding to checkout you must have some products in your shopping cart :)</p>
        <div class="no-products-button-wrapper">
            <va-button 
                @click="router.push('/')">
                Products
            </va-button>        
        </div>
    </div>
</div>

</template>



<script setup>

import { onMounted } from 'vue';
import { useUiStore, useShoppingCartStore } from '../services/stateStore';
import { localStorageAvailable, getItemFromLs } from '../services/lsManager';
import emptyShoppingCartSvg from  '~~/public/img/empty-shopping-cart.svg';
import { useColors } from 'vuestic-ui';
const { applyPreset } = useColors();
nextTick(() => {
    applyPreset(getItemFromLs('vuestic-docs-theme'));
});

// Pinia store
const uiStore = useUiStore();
const shoppingCartStore = useShoppingCartStore();

const router = useRouter();
let showRemoveItemModal = ref(false);
let shoppingCartItems = reactive([]); // products from Local Storage
let allProducts = reactive([]); // Database
let selectedProductId = null;

onMounted(() => {
    
    // Get products from DB so we know how many is in stock and the prices have not been tampered with in LS
    (async() => {
        let productsDbData = await $fetch('/api/get-products');
        productsDbData.forEach((product) => allProducts.push(product));
    })();
    loadItemsInShoppingCart();

    // I've having to set a Boolean to determine if these scripts have already been loaded and that they are only loaded once
    if(!uiStore.thirdPartyScriptsLoaded) {
        useHead({
            script: [
                {
                    src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBOIP84BkhD_JvqsFPGBosvmBOFCVg-ylw&libraries=places',
                    defer: true,
                    async: true
                },
                {
                    src: 'https://js.stripe.com/v3/',
                    defer: true,
                    async: true
                }
            ]
        });
        uiStore.thirdPartyScriptsLoaded = true;
    };
});

// Function calculates the quantity available in stock
function calculateProductQuantityInStock(productId, productQuantity) {
    
    let productDbIndex = allProducts.findIndex(product => product.id == productId);
    
    if(productDbIndex != -1) {
        return allProducts[productDbIndex].quantity - productQuantity;
    };
};

function calculateSubtotal() {

    let subtotal = 0;
    shoppingCartItems.forEach((product) => subtotal += product.quantity * (product.price_in_cents / 100));
    return subtotal;
};

// Function gets shopping cart from LS and pushes them into a Component var
function loadItemsInShoppingCart() {

    if(!localStorageAvailable) { return };

    let shoppingCart = getItemFromLs('RVSshoppingCart');
    if(!shoppingCart) { return };

    // Add shopping cart items from LS to component regionField
    shoppingCart.forEach((product) => {
        shoppingCartItems.push(product);
    });
};

function incrementCount(product) {

    let productDbIndex = allProducts.findIndex(dbProduct => dbProduct.id == product.id);
    if(allProducts[productDbIndex].quantity < product.quantity) {
        // Count automatically increments/decrements when the counter buttons are clicked. So I must minus 1 here.
        product.quantity--;
        return 
    };
    
    // Update LS
    shoppingCartStore.increaseProductQuantityInShoppingCart(product);
};

function decrementCount(product) {

    if(!localStorageAvailable) { return };

    // Keep track of product whos quantity was clicked
    selectedProductId = product.id;

    if(product.quantity < 1) {
        // If decreasing from 1, ask the user if they want to remove the item from their cart
        showRemoveItemModal.value = !showRemoveItemModal.value
        product.quantity++;
        return;
    };

    shoppingCartStore.reduceQuatityFromShoppingCart(product);
};


// *************************************************************
// Function is called when the user clicks 'ok' to remove their item from the cart
// *************************************************************
function removeItemFromShoppingCart() {

    // Remove product from LS
    shoppingCartStore.removeProductFromShoppingCart(selectedProductId);
    let productIndex = shoppingCartItems.findIndex(product => product.id == selectedProductId);
    shoppingCartItems.splice(productIndex, 1);
};

</script>



<style lang="scss">

.shopping-cart-products-wrapper {
    margin: 2rem 0 0 0;
    .va-input-wrapper__container {
        width: 8rem;        
    }  
}

</style>
