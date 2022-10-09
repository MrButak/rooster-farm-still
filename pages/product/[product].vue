<template>

<div v-show="productLoaded">
<p>{{ productData.description }}</p>
<button>Purchase</button>
</div>

</template>

<script setup>

const route = useRoute();

let productData = reactive({});
let productLoaded = ref(false);

onMounted(() => {

    (async() => {
        let productDbData = await $fetch(`/api/get-product`, { 
            query: { name: route.params.product.replaceAll('-', ' ') }
        });

        Object.assign(productData, productDbData); // reassign reactive object
        productLoaded.value = true;
    })();

    
});


// let itemIndex = 
//     productsData.findIndex(product => product.name == 
//     route.params.product.replaceAll('-', ' '));

</script>
