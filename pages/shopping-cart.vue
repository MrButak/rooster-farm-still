<template>

<Header />

<!-- Remove item from cart modal -->
<va-modal
    v-model="showRemoveItemModal"
    @ok="removeItemFromShoppingCart"
    message="Remove item from cart?"
    blur
/>

<div v-if="allProducts.length && shoppingCartItems.length" class="row row justify-center shopping-cart-products-wrapper">
    <div class="flex md6 lg4">
        <va-card>
        <!-- Loop through each product -->
        <span v-for="product in shoppingCartItems">
            <va-card-content>
                <h6 class="va-h6">{{ product.name }}</h6>
            </va-card-content>
            
            <va-card-actions align="between">
                <p>order quantity: {{ product.quantity }}</p>
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
                <p>left in stock: {{ calculateProductQuantityInStock(product.id, product.quantity) }}</p>
                <p>price: ${{ product.price * product.quantity }}</p>
            </va-card-content>
            
            <div class="my-5">
                <va-divider />
            </div>
        </span>

        <va-card-actions align="between">
            <h4 class="va-h4">Subtotal</h4>
            <h4 class="va-h4">${{ calculateSubtotal() }}</h4>
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

<div class="flex column justify-center" v-else>
    <p>
        There are currently no items in your shopping cart.
        Check out our quality stills.
    </p>
    <div class="no-products-button-wrapper">
        <va-button 
            @click="router.push('/')">
            Products
        </va-button>        
    </div>
    
</div>



</template>



<script setup>

import { onMounted } from 'vue';
import { showOkPopupModal, thirdPartyScriptsLoaded } from '../services/stateStore';
import { reduceQuatityFromShoppingCart, getTotalItemCountInShoppingCart, 
    removeProductFromShoppingCart, increaseProductQuantityInShoppingCart
} from '../services/shoppingCartManager';
import { localStorageAvailable, getItemFromLs } from '../services/lsManager';

const router = useRouter();
let showRemoveItemModal = ref(false);
let shoppingCartItems = reactive([]); // LS
let allProducts = reactive([]); // DB
let selectedProductId = null;

function testy(e) {
    console.log(e)
    console.log('firing')
}

onMounted(() => {

    // Get products from DB so we know how many is in stock and the prices have not been tampered with in LS
    (async() => {
        let productsDbData = await $fetch('/api/get-products');
        productsDbData.forEach((product) => allProducts.push(product));
    })();
    loadItemsInShoppingCart();

    // I've having to set a Boolean to determine if these scripts have already been loaded and that they are only loaded once
    if(!thirdPartyScriptsLoaded.value) {
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
        thirdPartyScriptsLoaded.value = true;
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
    shoppingCartItems.forEach((product) => subtotal += product.quantity * product.price);
    return subtotal;
};

// Function gets shopping cart from LS
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

    let productDbIndex = allProducts.findIndex(product => product.id == product.id);
    if(allProducts[productDbIndex].quantity < product.quantity) { 
        // Count automatically increments/decrements when the counter buttons are clicked. So I must minus 1 here.
        product.quantity--;
        return 
    };
    
    // Update LS
    increaseProductQuantityInShoppingCart(product);
    getTotalItemCountInShoppingCart();
};

function decrementCount(product) {

    if(!localStorageAvailable) { return };

    // Keep track of product whos quantity was clicked
    selectedProductId = product.id;

    if(product.quantity < 1) {
        showRemoveItemModal.value = !showRemoveItemModal.value
        product.quantity++;
        return;
    };

    reduceQuatityFromShoppingCart(product);
    getTotalItemCountInShoppingCart();
};


// *************************************************************
// Function is called when the user clicks 'ok' to remove their item from the cart
// *************************************************************
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



<style lang="scss">

.shopping-cart-products-wrapper {
    margin: 2rem 0 0 0;
    .va-input-wrapper__container {
        width: 8rem;        
    }  
}

</style>
