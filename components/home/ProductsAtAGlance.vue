<template>

<div 
    v-if="productStore.allProducts.length" 
    class="product-container">
    <div 
        v-for="product, index in productStore.allProducts" 
        :class="{'flex-row-reverse': index / 2 == 0}"
        class="product-wrapper">
        
        <va-image
            class="product-image rounded"
            :src="createImageUrlFromString(product.main_image_name)"
        />

        <va-card class="product-card rounded-none">
            <va-card-content>
                <h6 class="va-h6">{{ product.name }}</h6>
            </va-card-content>
            <va-card-content>
                <p>{{ product.description }}</p>
            </va-card-content>
            <va-card-content>
                <p><b>${{ product.price_in_cents / 100 }}</b></p>
            </va-card-content>
            <va-card-content 
                align="center"
                class="see-more-btn-wrapper"
                >
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
    .product-container {
        gap: 6rem;
    }
    .product-wrapper {
        display: flex;
        flex-wrap: nowrap;
        width: 80%;
    }
    .see-more-btn-wrapper {
        position: absolute;
        bottom: 0;
        width: 100%;
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
