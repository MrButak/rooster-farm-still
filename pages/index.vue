<template>

<div>
    <Header />
    <Hero />
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


</style>
    