<template>
    
<div 
    v-if="productStore.allProducts.length" 
    class="w-full flex flex-col items-center gap-9">
    <div 
        v-for="product in productStore.allProducts" 
        class="sm:w-2/3 md:w-1/2 md:p-0 w-full max-w-lg px-8">
        <va-card>
            <va-image
                :src="createImageUrlFromString(product.main_image_name)"
            />
            <va-card-content>
                <h6 class="va-h6">{{ product.name }}</h6>
            </va-card-content>
            <va-card-content>
                <p>{{ product.description }}</p>
            </va-card-content>
            <va-card-content>
                <p><b>${{ product.price_in_cents / 100 }}</b></p>
            </va-card-content>
            <va-card-content align="center">
                <va-button 
                    @click="router.push({ path: `/product/${product.name.replaceAll(' ', '-') }` })">
                    See More
                </va-button>
            </va-card-content>
        </va-card>
    </div>
</div>

</template>


<script setup>

import { useProductStore, createImageUrlFromString } from '~~/services/stateStore';
const productStore = useProductStore();

const router = useRouter();

// Backend call gets all products from DB
(async() => {
    await productStore.getAllProducts();
})();

</script>
