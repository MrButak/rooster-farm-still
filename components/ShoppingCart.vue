<template>

<span @click="router.push({path: '/shopping-cart'})" class="shopping-cart-wrapper">
    <img class="shopping-cart-icon" :src="shoppingCartIcon" />
    <p v-if="shoppingCartStore.itemCountInShoppingCart" class="shopping-cart-count">{{ shoppingCartStore.itemCountInShoppingCart  }}</p>
</span>

</template>


<script setup>

import shoppingCartIcon from  '/img/shopping-cart.svg';
import { useShoppingCartStore } from '../services/stateStore';

// Pinia store
const shoppingCartStore = useShoppingCartStore();

const router = useRouter();

</script>


<style lang="scss" scoped>

.shopping-cart-wrapper {
    display: flex;
    z-index: 5;
    position: fixed;
    width: 4rem;
    height: 5rem;
    border-radius: 0% 0% 50% 50%;
    transform: rotate(-90deg);
    background-color: #fce373ad;
    left: 0;
    align-items: center;
    justify-content: center;
    .shopping-cart-icon {
        width: 2.15rem;
        transform: rotate(90deg);
    }
    .shopping-cart-count {
        transform: rotate(90deg);
        transform: rotate(90deg);
        position: absolute;
        margin: 0 0 0 2.4rem;
        font-weight: bold;
    }
}

</style>
