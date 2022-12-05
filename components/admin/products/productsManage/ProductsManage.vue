<template>

<h3 class="va-h3">Products</h3>
<ProductsManageTable />

</template>



<script setup>

import { useAdminStore } from '~~/services/stateStore';
import ProductsManageTable from './ProductsManageTable.vue';

const adminStore = useAdminStore();

</script>



<style lang="scss" scoped>



</style>