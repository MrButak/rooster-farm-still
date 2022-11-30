<template>
    <div class="row">
      <va-input
        class="flex mb-2 md6 xs12"
        placeholder="Filter..."
        v-model="input"
      />
    </div>
  
    <va-data-table
      :items="allProducts"
      :columns="columns"
      :filter="input"
      icon="home"
      striped
    >
    <template #header(edit)="{ label }">
        <!-- <va-chip size="small">{{ label }}</va-chip> -->
    </template>
    <template #cell(edit)="{ value }">
        <va-icon 
            size="small" 
            name="edit" 
            @click="testy(value)"
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
  </template>



<script setup>


function testy(dbId) {
    console.log(dbId);
}

const columns = [
    { key: 'id', name: 'edit', label: 'edit' }, // passing the DB id here. When @click
    { key: 'visible', sortable: true },
    { key: 'name', sortable: true },
    { key: 'quantity', sortable: true },
    { key: 'added_on_timestamp', sortable: true },
    { key: 'price', sortable: true },
    // { key: 'address.zipcode', label: 'Zipcode' },
]

const input = ref('');
let allProducts = reactive([]);

(async() => {
    let productsDbData = await $fetch(`/api/get-products`);
    productsDbData.forEach((product) => {
        product.added_on_timestamp = new Date(product.added_on_timestamp).toLocaleString()

    });

    // console.log(productsDbData)
    Object.assign(allProducts, productsDbData);
    
})();



</script>



<style lang="scss" scoped>



</style>