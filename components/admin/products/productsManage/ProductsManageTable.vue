<template>
<div class="row">
      <va-input
        class="flex mb-2 md6 xs12"
        placeholder="Filter..."
        v-model="input"
      />
    </div>
  
    <va-data-table v-if="allProducts.length"
      :items="allProducts"
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
            @click="initiateConfirmProductEdit(value)"
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
    <va-modal v-model="showConfirmEdit" :confirmEditModalMessage="confirmEditModalMessage" title="Edit?" />

</template>



<script setup>

const input = ref('');
let allProducts = reactive([]);

let showConfirmEdit = ref(false);
let confirmEditModalMessage = ref('');

function initiateConfirmProductEdit(dbId) {
    showConfirmEdit.value = !showConfirmEdit.value;
    let selectedProductIndex = allProducts.findIndex(product => product.id == dbId);
    let selectedProduct = allProducts[selectedProductIndex];
    console.log(selectedProduct);
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

onMounted(() => {

    (async() => {
        await loadProductsIntoMemory();
    })();

});

async function loadProductsIntoMemory() {
    let productsDbData = await $fetch(`/api/get-products`);
    productsDbData.forEach((product) => {
        product.added_on_timestamp = new Date(product.added_on_timestamp).toLocaleString();

    });

    // console.log(productsDbData)
    Object.assign(allProducts, productsDbData);
};

// (async() => {
//     let productsDbData = await $fetch(`/api/get-products`);
//     productsDbData.forEach((product) => {
//         console.log(product)
//         product.added_on_timestamp = new Date(product.added_on_timestamp).toLocaleString();

//     });

//     // console.log(productsDbData)
//     Object.assign(allProducts, productsDbData);
    
// })();



</script>



<style lang="scss" scoped>



</style>