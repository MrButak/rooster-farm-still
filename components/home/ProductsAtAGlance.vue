<template>

    <div v-if="productsLoaded" class="products-at-a-glance-wrapper">

        <div class="column">
            <div v-for="product in allProducts" class="flex md6 lg4">
                <va-card>
                    <va-image
                    :src="product.image_url"
                    style="height: 300px;"
                    />
                    <va-card-title>{{ product.name }}</va-card-title>
                    <va-card-content>{{ product.description }}</va-card-content>
                    <va-button @click="router.push({ path: `/product/${product.name.replaceAll(' ', '-') }` })" class="see-more-button">See More</va-button>
                </va-card>
            </div>
        </div>

        <!-- <div class="product-wrapper" v-for="product in allProducts">
            <h3 class="product-title-text">
                {{ product.name }}
            </h3>
            <span class="product-image-wrapper">
                <img class="product-image" :src="product.image_url" />
            </span>
            <p>Price: {{ product.price }}</p>
            <p>{{ product.description }}</p>
            <div class="see-more-button-wrapper">
                <button @click="router.push({ path: `/product/${product.name.replaceAll(' ', '-') }` })" class="see-more-button">See More</button>
            </div>

        </div> -->
    </div>

</template>


<script setup>

const router = useRouter();
let allProducts = reactive([]);
let productsLoaded = ref(false);

onMounted(() => {
    (async() => {
        let productsDbData = await $fetch('/api/get-products');
        productsDbData.forEach((product) => allProducts.push(product));
        productsLoaded.value = true;
    })();
});

</script>


<style lang="scss" scoped>

// .products-at-a-glance-wrapper {
    
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-wrap: wrap;
//     padding: 1.2rem 1.2rem;
//     width: 100%;
//     gap: 2rem;
    
//     .product-wrapper {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         flex: 0.8 1 46%;
//         min-height: 100%;
//         border-bottom: 0.1rem solid black;
//         padding: 0.8rem 2rem;
//         justify-content: flex-end;
//         p {
//             font-size: large;
//         }
//         .product-image-wrapper {
//             display: flex;
//             height: 9rem;
//             .product-image {

//             }
//         }
//         .product-title-text {
//             font-size: xx-large;
//             text-align: center;
//         }
//         .see-more-button-wrapper {
//             padding: .8rem 0 0 0;
//             .see-more-button {
//                 cursor: pointer;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 border-radius: .2rem;
//                 background-color: black;
//                 color: white;
//                 padding: .5rem .8rem;
//                 border: 1px solid #b54514;
//                 letter-spacing: .1rem;
//                 font-weight: 600;
//             }
//         }
        
        
//     }
// }

// @media (min-width: 900px) { 

//     .products-at-a-glance-wrapper {

        
//     }
// }

</style>
