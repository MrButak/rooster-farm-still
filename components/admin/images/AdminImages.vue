<template>

<h3 class="va-h3">Images</h3>
<va-button @click="testS3">Test s3</va-button>
</template>



<script setup>

async function testS3() {
    let response = await $fetch(`/api/test-s3`, {
        method: 'POST',
        // body: JSON.stringify({
        //     shipping: orderStore.userShippingData,
        //     products: purchasedItemsObj,
        //     subtotal: orderStore.subTotal
        // })
    });
    console.log(response);
};

</script>



<style lang="scss" scoped>



</style>
