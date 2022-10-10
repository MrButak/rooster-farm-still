<template>

<span>
    <Header />

    <div v-show="productLoaded">

        <p>{{ productData.description }}</p>
        <button @click="handleAddToCart">Add To Cart</button>

        <div class="quantity-counter-wrapper">
            <button class="quantity-button" @click="decrementCount">-</button>
            <div class="quantity-number">{{ quantityCount }}</div>
            <button class="quantity-button" @click="incrementCount(quantityInStock)">+</button>
        </div>

    </div>

    <Footer />
</span>

</template>



<script setup>

import { addItemToShoppingCart, getTotalItemsInShoppingCart } from '../../services/shoppingCartManager.js';
import { isLocalStorageAvailable } from '../../services/lsManager.js';
import { shoppingCart, shallowProducts, shoppingCartCount } from '../../services/stateStore.js';

const route = useRoute();

let quantityCount = ref(0);
let quantityInStock = ref(0);

let productData = reactive({});
let productLoaded = ref(false);

onMounted(() => {
    (async() => {
        let productDbData = await $fetch('/api/get-product', { 
            query: { name: route.params.product.replaceAll('-', ' ') }
        });

        Object.assign(productData, productDbData); // reassign reactive object

        quantityCount.value = 1;
        quantityInStock.value = productDbData.quantity;
        productLoaded.value = true;
    })();
});

function decrementCount() {
    
    if(quantityCount.value > 1) {
        quantityCount.value--;
    };
};

function incrementCount(quantityInStock) {

    if(quantityCount.value < quantityInStock) {
        quantityCount.value++;
    };
};

function handleAddToCart() {

    if(quantityInStock.value < 1) { return };

    addItemToShoppingCart(productData, quantityCount);

    shoppingCart.item_count += quantityCount.value;
    
    productData.quantity =- quantityCount.value;
    quantityInStock.value =- quantityCount.value;
    quantityCount.value = 1;

    shoppingCartCount.value = getTotalItemsInShoppingCart();
    

    if(!isLocalStorageAvailable()) { return };
    
};

</script>
    

    
<style lang="scss" scoped>

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

</style>
    