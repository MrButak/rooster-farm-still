<template>

<div>
    <Header />

    

    <Footer />
</div>

</template>



<script setup>

let shoppingCart = reactive([]);
let shoppingCartLoaded = ref(false);

onMounted(() => {

});

function handleShoppingCart() {

    
};

</script>



<style lang="scss" scoped>


.no-items-wrapper {
    display: flex;
    margin: 2rem 0 0 0;
}
</style>
