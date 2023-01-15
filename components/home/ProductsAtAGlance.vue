<template>


<!-- <div 
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
</div> -->


<div 
    v-if="productStore.allProducts.length" 
    class="product-container">
    <div 
        v-for="product in productStore.allProducts" 
        class="product-wrapper">
        <va-image
            class="product-image"
            :src="createImageUrlFromString(product.main_image_name)"
        />

        
        <va-card class="product-card">
            
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


<style lang="scss">


.product-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.25rem;
    width: 100%;
}

.product-wrapper {
    width: 95%;
}


@media (min-width: 540px) {
    .product-wrapper {
        width: 80%;
    }
}

@media (min-width: 640px) {
    .product-wrapper {
        width: 70%;
    }
}

@media (min-width: 768px) {
    .product-wrapper {
        width: 60%;
    }
}

@media (min-width: 1024px) {
    .product-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 80%;
    }
    .product-image {
        min-width: 50%;
    }
    
    .product-card {
        min-width: 50%;
        min-height: 100%;
    }
}
@media (min-width: 1920px) {
    .product-wrapper {
        max-width: 48rem;
    }
   
}

</style>
