<template>

<div class="home-page-wrapper">
    <Header />
    <!-- <Hero /> -->
    <!-- <Footer /> -->
</div>
    
</template>

<script setup>
import Hero from '~~/components/home/Hero.vue';

const config = useRuntimeConfig();

async function testDbCall() {
    let testData = await $fetch('/api/test-db');
    console.log(testData);
};

</script>

<style scoped>

.home-page-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #ffd00038;
}

</style>
    