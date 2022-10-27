<template>
<Script src="https://js.stripe.com/v3/"></Script>
<Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOIP84BkhD_JvqsFPGBosvmBOFCVg-ylw&libraries=places"></Script>
<div>
    <NuxtPage />
    <Footer />
</div>

</template>

<script setup>

import { getTotalItemCountInShoppingCart } from './services/shoppingCartManager';

// Look at LS and total up the items. Function determines the number in the shooping cart
onMounted(() => {
    // Consider checking DB products price against LS and update LS if needed
    getTotalItemCountInShoppingCart();
});

</script>

<style lang="scss">

body {
    // Relavtive body + absolute footer with bottom: 0 == footer stays at the bottom
    position: relative;
    min-height: 100vh;
    background-color: #FDFDFD;
    
}

* {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

</style>