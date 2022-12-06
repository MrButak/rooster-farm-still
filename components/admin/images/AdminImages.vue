<template>

<h3 class="va-h3">Images</h3>
<div v-for="folder in allImageData" class="">

    <p>{{ folder.Key }}</p>

</div>
<va-button @click="testS3">Test s3</va-button>
</template>



<script setup>

let allImageData = reactive([]);

async function testS3() {
    let response = await $fetch(`/api/test-s3`, {
        method: 'POST',
        // body: JSON.stringify({
        //     shipping: orderStore.userShippingData,
        //     products: purchasedItemsObj,
        //     subtotal: orderStore.subTotal
        // })
    });
    Object.assign(allImageData, response.imageData);
    console.log(response.imageData);
};

</script>



<style lang="scss" scoped>



</style>
