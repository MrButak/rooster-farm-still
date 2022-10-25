<template>

<div>
    <Header />
    <OkPopupModal 
        popup-message="Do you want to remove this item from your shopping cart?"
        :remove-item-from-shopping-cart="removeItemFromShoppingCart"
    />
    
    <div v-if="allProducts.length && shoppingCartItems.length" class="shopping-cart-items-wrapper">
    
        <div v-for="product in shoppingCartItems" class="shopping-cart-item">

            <h3>{{ product.name }}</h3>
            <span class="quantity-wrapper">
                <p>order quantity: {{ product.quantity }}</p>
                <div class="quantity-counter-wrapper">
                    <button class="quantity-button" @click="decrementCount(product)">-</button>
                    <div class="quantity-number">{{ product.quantity }}</div>
                    <button class="quantity-button" @click="incrementCount(product)">+</button>
                </div>
            </span>
            <p>left in stock: {{ calculateProductQuantityInStock(product.id, product.quantity) }}</p>
            <p>price: ${{ product.price * product.quantity }}</p>
        </div>

        <div class="subtotal-wrapper">
            <p>Subtotal</p>
            <p>${{ calculateSubtotal() }}</p>
        </div>
        <button @click="router.push('/checkout')">Checkout</button>
    </div>
    <Footer />
</div>

</template>



<script setup>

import { showOkPopupModal } from '../services/stateStore';
import { reduceQuatityFromShoppingCart, getTotalItemCountInShoppingCart, removeProductFromShoppingCart, increaseProductQuantityInShoppingCart } from '../services/shoppingCartManager';
import { localStorageAvailable, getItemFromLs } from '../services/lsManager';

const router = useRouter();
let shoppingCartItems = reactive([]); // LS
let allProducts = reactive([]); // DB
let selectedProductId = null;


onMounted(() => {

    // Get products from DB so we know how many is in stock
    (async() => {
        let productsDbData = await $fetch('/api/get-products');
        productsDbData.forEach((product) => allProducts.push(product));
    })();
    loadItemsInShoppingCart();
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
    shoppingCartItems.forEach((product) => subtotal += product.quantity * product.price);
    return subtotal;
};

// Function gets shopping cart from LS
function loadItemsInShoppingCart() {

    if(!localStorageAvailable) { return };

    let shoppingCart = getItemFromLs('RSVshoppingCart');
    if(!shoppingCart) { return };

    // Add shopping cart items from LS to component regionField
    shoppingCart.forEach((product) => {
        shoppingCartItems.push(product);
    });
};

function incrementCount(productLs) {

    let productDbIndex = allProducts.findIndex(product => product.id == productLs.id);
    if(allProducts[productDbIndex].quantity < productLs.quantity + 1) { return };

    // Update regionField
    productLs.quantity++;
    
    // Update LS
    increaseProductQuantityInShoppingCart(productLs);
    getTotalItemCountInShoppingCart();
};

function decrementCount(product) {

    if(!localStorageAvailable) { return };

    // Keep track of product whos quantity was clicked
    selectedProductId = product.id;

    if(product.quantity < 2) {
        showOkPopupModal.value = true;
        return;
    };
    product.quantity -= 1;

    reduceQuatityFromShoppingCart(product);
    getTotalItemCountInShoppingCart();
};

// props
function removeItemFromShoppingCart() {

    // Remove product from LS
    removeProductFromShoppingCart(selectedProductId);
    getTotalItemCountInShoppingCart();

    // Remove product from regionField
    let productIndex = shoppingCartItems.findIndex(product => product.id == selectedProductId);
    shoppingCartItems.splice(productIndex, 1);

    showOkPopupModal.value = false;
};

</script>



<style lang="scss" scoped>


.no-items-wrapper {
    display: flex;
    padding: 2rem 0 0 0;
}
.shopping-cart-items-wrapper {
    display: flex;
    flex-direction: column;
    padding: 2rem 0 0 0;

    .shopping-cart-item {
        padding: .6rem 1rem;
        border-bottom: 1px solid black;
        .quantity-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .quantity-counter-wrapper {
                display: flex;
                .quantity-button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 2rem;
                    height: 2rem;
                }
                .quantity-number {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 2rem;
                    height: 2rem;
                    border: 1px solid black;
                }
            }
        }
    }
    .subtotal-wrapper {
        display: flex;
        justify-content: space-between;
        padding: .6rem 1rem;
    };
}


@media (min-width: 900px) { 

    .shopping-cart-items-wrapper {

        padding: 5rem 0 0 0;
    }
}
</style>
