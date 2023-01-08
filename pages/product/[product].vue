<template>
<!-- TODO: set this header Globally using conditions -->
<Header />
        
<div v-if="productLoaded" class="flex flex-col md:flex-row">
    <va-carousel
        class=""
        :items="imageUrlArray(productData[0].image_names)" 
        :ratio="4/3" 
        stateful indicators infinite swipable 
    />
    <div class="flex">
    <va-card class="md:w-[50vw]">
        <va-card-content class="h-full">

        <div class="flex flex-col h-full">

            
        <h4 class="va-h4">{{ productData[0].name }}</h4>

        <va-tabs v-model="productDetailsTabs">
            <template #tabs>
                <va-tab
                    v-for="tab in ['Description', 'Specs']"
                    :key="tab"
                    >
                    {{ tab }}
                </va-tab>
            </template>
        </va-tabs>

        <div class="overflow-y-scroll h-64 pt-4">
            <!-- description and specification tabs -->
            <text v-if="(productDetailsTabs == 0)">{{ productData[0].description }}</text>
            <span v-else>
                <p v-for="spec in productData[0].specifications">
                    {{ Object.keys(spec)[0] }}: {{ Object.values(spec)[0] }}
                </p>
            </span>
        </div>
        
        <text>Price: ${{ (productData[0].price_in_cents / 100) * quantitySelect }}</text>
        <div class="flex align-end gap-6 pt-6">

            <span v-if="productData[0].quantity > 0">
                <va-counter 
                    class=""
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
            <text v-else>Sorry, we are sold out!</text>

            <va-button 
                @click="handleAddToCart"
                :disabled="isItemInCart">
                {{ addToCartButtonText }}
            </va-button>
        </div>
            

        </div>
        </va-card-content>
    </va-card>
    </div>
</div>

<va-button class="mr-2 mb-2" @click="$vaToast.init({ message: 'success color', color: 'success' })">success</va-button>

</template>



<script setup>

import { ref, onMounted, computed } from 'vue';
import { useShoppingCartStore } from '~~/services/stateStore';
import { getItemFromLs } from '../../services/lsManager';

import { useColors } from 'vuestic-ui';
const config = useRuntimeConfig();
const { applyPreset } = useColors();
nextTick(() => {
    applyPreset(getItemFromLs('vuestic-docs-theme'))
});

let productDetailsTabs = ref(0);
// Pinia store
const shoppingCartStore = useShoppingCartStore();

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

// Function accepts an Array of Strings and prepends each string with the AWS S3 bucket url
function imageUrlArray(imageNameArray) {
		// Default images if none
		if(!imageNameArray || !imageNameArray.length) {
			return ['https://picsum.photos/1505', 'https://picsum.photos/1504', 'https://picsum.photos/1503']
		}
		return imageNameArray.map((imageName) => {
				return `${config.public.AWS_S3_BUCKET_BASE_URL}${imageName}`
		});
};

onMounted(() => {
    (async() => {
        await getProductFromDatabase();
    })();
});

async function getProductFromDatabase() {

    let productDbData = await $fetch(`/api/get-product`, { 
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
    quantitySelect.value = 1;
    productLoaded.value = true;
};


function handleAddToCart() {
    
    // If not enough products in stock, return
    if(quantitySelect.value > productData[0].quantity) { return };
    shoppingCartStore.addItemToShoppingCart(productData[0], quantitySelect.value);

    // Reduce the amount in stock on the Component variable
    productData[0].quantity -= quantitySelect.value;

    quantitySelect.value = 1;

    // For the add to card button text // sold out
    isItemInCart.value = true;
};

</script>
    