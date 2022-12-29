<template>
<div class="row">
      <va-input
        class="flex mb-2 md6 xs12"
        placeholder="Filter..."
        v-model="input"
      />
    </div>
  
    <va-data-table v-if="productStore.allProducts.length"
      :items="productStore.allProducts"
      :columns="columns"
      :filter="input"
      icon="home"
      striped
    >

    <template #header(edit)="{ label }">
        <!-- <va-chip size="small">{{ label }}</va-chip> -->
    </template>
    <!-- DB id is value -->
    <template #cell(edit)="{ value }">
        <va-icon 
            size="small" 
            name="edit" 
            @click="selectedProductId = value; adminStore.initiateConfirmProductEdit(value, productStore.allProducts)"
            />
    </template>

    <template #header(images)="{ label }">
        <!-- <va-chip size="small">{{ label }}</va-chip> -->
        {{ label }}
    </template>

    <template #cell(images)="{ value }">
        {{ totalImageCount(value) }}
        <va-icon 
            size="small" 
            name="visibility" 
            @click="handleShowProductImages(value)"
            
            />
    </template>

    </va-data-table>

    <!-- @filtered="filteredCount = $event.allProducts.length"   -->
    <!-- <va-alert class="mt-3" color="info" outline>
      <span>
        Number of filtered items:
        <va-chip>{{ filteredCount }}</va-chip>
      </span>
    </va-alert> -->

    <!-- Confirm edit popup modal -->
    <va-modal 
        v-model="adminStore.showConfirmEditModal" :message="adminStore.confirmEditModalMessage" title="Edit?" 
        @ok="adminStore.handleGotoEditProductView(selectedProductId, productStore.allProducts)"    
    />

</template>



<script setup>

import { useAdminStore, useProductStore } from '~~/services/stateStore';
const adminStore = useAdminStore();
const productStore = useProductStore();

// API call to backend - gets all products from DB
(async() => {
    await productStore.getAllProducts();
})();

// When a user clicks the edit product icon, this will store the id.
let selectedProductId = ref(0);

const input = ref('');
// let allProducts = reactive([]);

function totalImageCount(productId) {
    let selectedProductIndex = productStore.allProducts.findIndex(product => product.id == productId);
    let selectedProduct = productStore.allProducts[selectedProductIndex];
    return selectedProduct.image_names.length;
};

function handleShowProductImages(productId) {
    console.log('show images here');;
};

const columns = [
    { key: 'id', name: 'edit', label: 'edit' }, // passing the DB id here. When @click
    { key: 'visible', sortable: true },
    { key: 'name', sortable: true },
    { key: 'quantity', sortable: true },
    { key: 'price', sortable: true },
    { key: 'id', name: 'images', label: 'images' }, // passing the DB id here. When @click
    { key: 'added_on_timestamp', sortable: true },
];


</script>



<style lang="scss" scoped>



</style>