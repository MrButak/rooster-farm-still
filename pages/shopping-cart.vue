<template>

<div>

    <OkPopupModal 
        popup-message="Do you want to remove this item from your shopping cart?"
        :remove-item-from-shopping-cart="removeItemFromShoppingCart"
    />
    
    <div v-if="shoppingCartItems.length" class="shopping-cart-items-wrapper">
    
        <div v-for="product in shoppingCartItems" class="shopping-cart-item">

            {{ product.name }}
            <div class="quantity-counter-wrapper">
                <button class="quantity-button" @click="decrementCount(product)">-</button>
                <div class="quantity-number">{{ product.quantity }}</div>
                <button class="quantity-button" @click="incrementCount">+</button>
            </div>

        </div>

    </div>

</div>

</template>



<script setup>

import { showOkPopupModal } from '../services/stateStore';
import { reduceQuatityFromShoppingCart, getTotalItemCountInShoppingCart, removeProductFromShoppingCart } from '../services/shoppingCartManager';
import { localStorageAvailable, getItemFromLs } from '../services/lsManager';

let shoppingCartItems = reactive([]);
let selectedProductId = null;

onMounted(() => {

    loadItemsInShoppingCart();
});

function loadItemsInShoppingCart() {

    if(!localStorageAvailable) { return };

    let shoppingCart = getItemFromLs('RSVshoppingCart');
    if(!shoppingCart) { return };

    // Add shopping cart items from LS to component State
    shoppingCart.forEach((product) => {
        shoppingCartItems.push(product);
    });
};

function incrementCount() {


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

    // Remove product from State
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

    }
}

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

@media (min-width: 900px) { 

    .shopping-cart-items-wrapper {

        padding: 5rem 0 0 0;
    }
}
</style>
