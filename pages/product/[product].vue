<template>
<!-- TODO: set this header Globally using conditions -->
<Header />

<div class="product-wrapper-main">
    <div v-if="productLoaded" class="product-wrapper">
        <va-carousel :items="productSliderImages" stateful indicators infinite swipable />
        <h3 class="va-h3">{{ productData[0].name }}</h3>
        <p>{{ productData[0].description }}</p>
        <p>${{ productData[0].price * quantitySelect }}</p>
        
        <span class="row align-center" v-if="productData[0].quantity > 0">
            <p>Quantity:</p>
            <va-counter class="mx-4 my-2"
                v-model="quantitySelect"
                :min="1" 
                :max="productData[0].quantity" 
                outline
                buttons
                :flat="false"
                margins="0"
                rounded
            />
        </span>
        
        <p v-else>Sorry, we are sold out!</p>
        <va-button @click="handleAddToCart">Add To Cart</va-button>

        <!-- <div class="quantity-counter-wrapper">
            <button class="quantity-button" @click="decrementCount">-</button>
            <div class="quantity-number">{{ quantitySelect }}</div>
            <button class="quantity-button" @click="incrementCount">+</button>
        </div> -->

    </div>

</div>

</template>



<script setup>

import { addItemToShoppingCart, getTotalItemCountInShoppingCart } from '../../services/shoppingCartManager';
import { getItemFromLs } from '../../services/lsManager';

const productSliderImages = ['https://picsum.photos/1500',
  'https://picsum.photos/1501',
  'https://picsum.photos/1502',
  'https://picsum.photos/1503',
  'https://picsum.photos/1504',
]

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
        let shoppingCart = getItemFromLs('RVSshoppingCart');
        if(shoppingCart) {
            let itemIndex = shoppingCart.findIndex(item => item.id == productDbData.id);
            // If item was already in shopping cart, update State with the updated quantity. (quantity in DB - quantity in cart)
            if(itemIndex != -1) {
                productDbData.quantity -= shoppingCart[itemIndex].quantity;
            };
        };
        // Component variable
        productData.length = 0;
        productData.push(productDbData);
        // TODO: should check if the quantity is > 0. If not display a 'sold out' view to the user
        quantitySelect.value = 1;
        productLoaded.value = true;
        console.log(productData[0].quantity)
    })();
});

// function decrementCount() {
//     if(quantitySelect.value > 1) {
//         quantitySelect.value--;
//     };
// };

// function incrementCount() {

//     if(quantitySelect.value < productData[0].quantity) {
//         quantitySelect.value++;
//     };
// };

function handleAddToCart() {

    // If not enough products in stock, return
    if(quantitySelect.value > productData[0].quantity) { return };
    addItemToShoppingCart(productData[0], quantitySelect.value);

    // Reduce the amount in stock on the Component variable
    productData[0].quantity -= quantitySelect.value;

    quantitySelect.value = 1;
    getTotalItemCountInShoppingCart();
};

</script>
    

    
<style lang="scss" scoped>
.product-wrapper-main {
    display: flex;
    justify-content: center;
    width: 100%;
}
.product-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 45rem;
    padding: 1.2rem;
    p {
        
    }
    button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .2rem;
        background-color: black;
        color: white;
        padding: .5rem .8rem;
        border: 1px solid #b54514;
        letter-spacing: .1rem;
        font-weight: 600;
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
        background-color: black;
        border: 1px solid #b54514;
        color: white;
        font-weight: 600;
    }
    .quantity-number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        border-top: 1px solid #b54514;
        border-bottom: 1px solid #b54514;
    }
}

</style>
    