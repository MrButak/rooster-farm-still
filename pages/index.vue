<template>

<div>
    <Header />
    <ProductsAtAGlance />
</div>
    
</template>



<script setup>
import { onMounted } from 'vue';
import ProductsAtAGlance from '~~/components/home/ProductsAtAGlance.vue';
import { getItemFromLs } from '~~/services/lsManager';

import { useColors } from 'vuestic-ui';
const { applyPreset } = useColors();
nextTick(() => {
    applyPreset(getItemFromLs('vuestic-docs-theme'));
});

</script>



<style lang="scss" scoped>



</style>
    