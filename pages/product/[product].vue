<template>

<span>
    <!-- <Header /> -->

    <div v-if="productLoaded" class="product-wrapper">

        <p>{{ productData[0].name }}</p>
        <p>{{ productData[0].description }}</p>
        <p>${{ productData[0].price * quantitySelect }}</p>
        <button @click="handleAddToCart">Add To Cart</button>

        <div class="quantity-counter-wrapper">
            <button class="quantity-button" @click="decrementCount">-</button>
            <div class="quantity-number">{{ quantitySelect }}</div>
            <button class="quantity-button" @click="incrementCount">+</button>
        </div>

    </div>

    <!-- <Footer /> -->
</span>

</template>



<script setup>

import { addItemToShoppingCart, getTotalItemCountInShoppingCart } from '../../services/shoppingCartManager';
import { getItemFromLs } from '../../services/lsManager';
const route = useRoute();

let quantitySelect = ref(0); // user selected quantity
let productData = reactive([]); // product from DB
let productLoaded = ref(false);

onMounted(() => {
    
    (async() => {
        
        let productDbData = await $fetch('/api/get-product', { 
            query: { name: route.params.product.replaceAll('-', ' ') }
        });


        // Check to see if item already exists in shopping cart, and update quantity
        let shoppingCart = getItemFromLs('RSVshoppingCart');
        if(shoppingCart) {
            let itemIndex = shoppingCart.findIndex(item => item.id == productDbData.id);
            if(itemIndex != -1) {
                productDbData.quantity -= shoppingCart[itemIndex].quantity;
            };
        };
    
        productData.length = 0;
        productData.push(productDbData);
        quantitySelect.value = 1;
        productLoaded.value = true;
    })();
});

function decrementCount() {
    if(quantitySelect.value > 1) {
        quantitySelect.value--;
    };
};

function incrementCount() {

    if(quantitySelect.value < productData[0].quantity) {
        quantitySelect.value++;
    };
};

function handleAddToCart() {

    // If not enough products in stock, return
    if(quantitySelect.value > productData[0].quantity) { return };
    addItemToShoppingCart(productData[0], quantitySelect.value);

    // Reduce the amount in stock
    productData[0].quantity -= quantitySelect.value;

    quantitySelect.value = 1;
    getTotalItemCountInShoppingCart();
};

</script>
    

    
<style lang="scss" scoped>

.product-wrapper {
    margin: 2rem 0 0 0;
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

</style>
    