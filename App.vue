<template>

<div>
    <NuxtPage />
</div>

</template>

<script setup>

import { getTotalItemsInShoppingCart } from './services/shoppingCartManager';

// Update State
onMounted(() => getTotalItemsInShoppingCart());

</script>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>