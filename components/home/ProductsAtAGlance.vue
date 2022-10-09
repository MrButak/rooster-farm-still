<template>

<div v-show="productsLoaded" class="products-at-a-glance-wrapper">
    
    <div class="product-wrapper" v-for="product in productsData">
        <h3 class="product-title-text">
            {{ product.name }}
        </h3>
        <span class="product-image-wrapper">
            <img class="product-image" :src="product.image_url" />
        </span>
        <p>Price: {{ product.price }}</p>
        <p>{{ product.description }}</p>
        <button @click="router.push({ path: `/product/${product.name.replaceAll(' ', '-') }` })">See More</button>

    </div>
    
</div>

</template>


<script setup>

const router = useRouter();

let productsLoaded = ref(false);
let productsData = reactive([]);

onMounted(() => {
    (async() => {
        let productsDbData = await $fetch('/api/get-products');
        productsDbData.forEach((product) => productsData.push(product));
        productsLoaded.value = true;
    })();
});


</script>


<style lang="scss" scoped>

.products-at-a-glance-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem 1rem 0 1rem;
    width: 100%;
    gap: 2rem;
    
    .product-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0.8 1 46%;
        min-height: 100%;
        border-bottom: 0.1rem solid black;
        padding: 0.8rem 2rem;
        justify-content: flex-end;

        .product-image-wrapper {
            display: flex;
            height: 9rem;
            .product-image {

            }
        }
        .product-title-text {
            font-size: xx-large;
            text-align: center;
        }
        .see-more-button {
            padding: 0.3rem;
            border-radius: 0.4rem;
            background: none;
        }
        
    }
}

</style>
