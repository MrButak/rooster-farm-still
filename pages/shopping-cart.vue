<template>

<div>
    <Header />

    <div v-if="shoppingCartLoaded && shoppingCart.length" v-for="product in shoppingCart">
        {{ product }}
    </div>

    <div v-else-if="shoppingCartLoaded" class="no-items-wrapper">
        <p>No items in shopping cart</p>
    </div>

    <Footer />
</div>

</template>



<script setup>

import {  } from '../services/shoppingCartManager';
import { isLocalStorageAvailable, isItemInLs, getItemFromLs } from '../services/lsManager';

let shoppingCart = reactive([]);
let shoppingCartLoaded = ref(false);

onMounted(() => {

    handleShoppingCart();
});

function handleShoppingCart() {

    if(!isLocalStorageAvailable || !isItemInLs('RVSshoppingCart')) {

        shoppingCartLoaded.value = true;
        return;
    };

    Object.assign(shoppingCart, getItemFromLs('RVSshoppingCart'));
    shoppingCartLoaded.value = true;
};

</script>



<style lang="scss" scoped>


.no-items-wrapper {
    display: flex;
    margin: 2rem 0 0 0;
}
</style>
