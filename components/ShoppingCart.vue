<template>

<span 
    @click="router.push({path: '/shopping-cart'})" 
    class="shopping-cart-wrapper"
    >
    <img class="shopping-cart-icon" :src="shoppingCartIcon" />
    <p 
        v-if="shoppingCartStore.itemCountInShoppingCart" 
        class="shopping-cart-count text-black"
        :class="{ shake: disabled }"
        >
        {{ shoppingCartStore.itemCountInShoppingCart  }}
    </p>
</span>

</template>


<script setup>

import shoppingCartIcon from  '/img/shopping-cart.svg';
import { useShoppingCartStore } from '../services/stateStore';

// Pinia store
const shoppingCartStore = useShoppingCartStore();
const router = useRouter();

// Item count animation
let disabled = ref(false);
function warnDisabled() {
    disabled.value = true
    setTimeout(() => {
        disabled.value = false
    }, 1500)
};
watchEffect(() => {
    warnDisabled(shoppingCartStore.itemCountInShoppingCart);
});

</script>


<style lang="scss" scoped>

.shopping-cart-wrapper {
    display: flex;
    z-index: 5;
    position: fixed;
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 0% 50% 50% 0%;
    background-color: #fce373ad;
    left: 0;
    align-items: center;
    justify-content: center;
    .shopping-cart-icon {
        width: 2.15rem;
    }
    .shopping-cart-count {
        
        position: absolute;
        margin: 0 0 2.4rem 0;
        font-weight: bold;
    }
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(0, -1px, 0);
  }

  20%,
  80% {
    transform: translate3d(0, 2px, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(0, -4px, 0);
  }

  40%,
  60% {
    transform: translate3d(0, 4px, 0);
  }
}

</style>
