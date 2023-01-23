<template>
    <va-inner-loading 
            :loading ="productLoading"
            :size="60"
            >

<div class="main-container">
<div
    v-if="productStore.allProducts.length"
    class="products-container"
    >
    <div v-for="product, index in productStore.allProducts"
        class="product-wrapper"
        >
        <div class="product-card-wrapper">
        <va-card>
            <va-card-content>
                <va-image
                    class=""
                    :src="createImageUrlFromString(product.main_image_name)"
                />
            </va-card-content>
            <va-card-content>
                <h6 class="va-h6">{{ product.name }}</h6>
            </va-card-content>
            <!-- <va-card-content>
                <p>{{ product.short_description }}</p>
            </va-card-content> -->
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
</div>
</div>
</va-inner-loading>
</template>


<script setup>


import { useProductStore, createImageUrlFromString } from '~~/services/stateStore';
const productStore = useProductStore();

const router = useRouter();

let productLoading = ref(true);
;(async() => {
    await productStore.getAllProducts();
    productLoading.value = !productLoading.value
})();
</script>


<style lang="scss">


.main-container {
    display: flex;
    justify-content: center;
}
.products-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1.8rem;
    width: 100%;
    padding: 0 1rem;
}
.product-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.product-card-wrapper {
    width: 100%;
    text-align: center;
}

@media (min-width: 540px) {
    .products-container {
        gap: 3rem;
        // padding: 0 2rem;
    }
    .product-wrapper {
        width: 44%;
    }
}

@media (min-width: 640px) {
}

@media (min-width: 768px) {

    .products-container {
        max-width: 1024px;
    }
    .product-wrapper {
        width: 28%;
    }
}

@media (min-width: 1024px) {
}
@media (min-width: 1920px) {
}
</style>
