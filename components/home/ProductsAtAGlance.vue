<template>

    <div v-if="allProducts.length" class="all-products-wrapper">

        <div v-for="product in allProducts" class="flex md6 lg4">
            <va-card>
                <va-image
                :src="product.image_url"
                />
                <va-card-content>
                    <h6>{{ product.name }}</h6>
                </va-card-content>
                <va-card-content>
                    {{ product.description }}
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

import { onMounted } from 'vue';
const router = useRouter();
let allProducts = reactive([]);
const config = useRuntimeConfig();
onMounted(() => {
    (async() => {
        let productsDbData = await $fetch(`/api/get-products`);
        productsDbData.forEach((product) => allProducts.push(product));
    })();
});

</script>

<style lang="scss">

.all-products-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    margin: 4rem 0 0 0;
    padding: 0 1rem;
}

</style>