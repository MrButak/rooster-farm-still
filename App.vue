<template>

<div>
    <Header />
    <NuxtPage />
    <Footer />
</div>

</template>

<script setup>

import { getTotalItemCountInShoppingCart } from './services/shoppingCartManager';

// Update State
onMounted(() => getTotalItemCountInShoppingCart());

</script>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>