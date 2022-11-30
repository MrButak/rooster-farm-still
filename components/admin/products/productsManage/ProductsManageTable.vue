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
        v-model="showConfirmEdit" :message="confirmEditModalMessage" title="Edit?" 
        @ok="testy"    
    />

</template>



<script setup>

const input = ref('');
let allProducts = reactive([]);

function totalImageCount(productId) {

    let selectedProductIndex = allProducts.findIndex(product => product.id == productId);
    let selectedProduct = allProducts[selectedProductIndex];
    return selectedProduct.image_urls.length + 1;

};

function handleShowProductImages(productId) {
    console.log('show images here');;
};

function testy() {
    console.log('Ok buddy row')
}

let showConfirmEdit = ref(false);
let confirmEditModalMessage = ref('')

function initiateConfirmProductEdit(productId) {
    showConfirmEdit.value = !showConfirmEdit.value;
    let selectedProductIndex = allProducts.findIndex(product => product.id == productId);
    let selectedProduct = allProducts[selectedProductIndex];
    confirmEditModalMessage.value =
        `Are you sure you want to edit ${selectedProduct.name} ?`
    console.log(selectedProduct);
}

const columns = [
    { key: 'id', name: 'edit', label: 'edit' }, // passing the DB id here. When @click
    { key: 'visible', sortable: true },
    { key: 'name', sortable: true },
    { key: 'quantity', sortable: true },
    { key: 'price', sortable: true },
    { key: 'id', name: 'images', label: 'images' }, // passing the DB id here. When @click
    { key: 'added_on_timestamp', sortable: true },
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