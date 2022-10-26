<template>

<div class="order-summary-wrapper">
   
    <div v-for="data in userShippingData">
        {{ data }}
    </div>

</div>

</template>



<script setup>

import { userShippingData } from '../../services/stateStore';

</script>



<style lang="scss" scoped>

.order-summary-wrapper {

}

</style>
