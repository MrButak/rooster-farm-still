<template>
<!-- TODO: set this header Globally using conditions -->
<Header />
        
<div class="product-wrapper-main">
    <div v-if="productLoaded" class="product-wrapper va-spacing-y-4 va-spacing-x-4">

        <va-carousel :items="productSliderImages" :ratio="4/3" stateful indicators infinite swipable />

        
            <div class="flex xl12">
            <va-card style="height:95.5%;">
                <va-card-content>
                    <h4 class="va-h4">{{ productData[0].name }}</h4>
                    <p>{{ productData[0].description }}</p>
                    <p>Price: ${{ productData[0].price * quantitySelect }}</p>
                
                <div class="quantity-and-checkout-button-wrapper">

                
                <span v-if="productData[0].quantity > 0">
                    <va-counter 
                        class="quantity-counter mx-4 my-2"
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

                <va-button 
                    @click="handleAddToCart"
                    :disabled="isItemInCart">
                    {{ addToCartButtonText }}
                </va-button>
                </div>
                </va-card-content>
            

            </va-card>
            </div>
        

    </div>

</div>

</template>



<script setup>

import { onMounted, computed } from 'vue';
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
let isItemInCart = ref(false);
let addToCartButtonText = computed(() => {
    return isItemInCart.value ?
        'In cart' :
        'Add to cart'
});

onMounted(() => {
    (async() => {
        await getProductFromDatabase();
    })();
});

async function getProductFromDatabase() {

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
            // For the add to card button text
            isItemInCart.value = true;
        };
    };
    // Component variable
    productData.length = 0;
    productData.push(productDbData);
    // TODO: should check if the quantity is > 0. If not display a 'sold out' view to the user
    quantitySelect.value = 1;
    productLoaded.value = true;
};


function handleAddToCart() {

    // If not enough products in stock, return
    if(quantitySelect.value > productData[0].quantity) { return };
    addItemToShoppingCart(productData[0], quantitySelect.value);

    // Reduce the amount in stock on the Component variable
    productData[0].quantity -= quantitySelect.value;

    quantitySelect.value = 1;
    getTotalItemCountInShoppingCart();
    // For the add to card button text
    isItemInCart.value = true;
};

</script>
    

    
<style lang="scss">

.product-wrapper-main {
    display: flex;
    justify-content: center;
    padding: 0 1rem;
    margin: 2rem 0 0 0;
    .product-wrapper {
        .va-input-wrapper__container {
                width: 8rem;
            }
            .quantity-and-checkout-button-wrapper {
                display: flex;
                width: 100%;
            }
    }  
}

// @media only screen and (min-width: 640px)  {
    
        
//         .product-wrapper {
//             display: flex;
//             width: 120rem;
            
//         }  
 

// }

</style>
    