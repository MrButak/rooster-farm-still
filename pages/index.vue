<template>

<div class="home-page-wrapper">
    <Header />
    <ProductsAtAGlance />
    <!-- <Hero /> -->
    <!-- <Footer /> -->
</div>
    
</template>

<script setup>
import Hero from '~~/components/home/Hero.vue';
import ProductsAtAGlance from '~~/components/home/ProductsAtAGlance.vue';

const config = useRuntimeConfig();

async function testDbCall() {
    let testData = await $fetch('/api/test-db');
    console.log(testData);
};

</script>

<style lang="scss" scoped>

.home-page-wrapper {
    
    // background: #ffd00038;
    height: 100vh;
    background-color: #fce37325;
}

</style>
    