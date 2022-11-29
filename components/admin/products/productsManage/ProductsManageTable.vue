<template>

<va-data-table
    striped
    :items="allProducts"
    :columns="columns"
    :hoverable="true"
    

    
/>
<!-- v-model:sort-by="sortBy" -->
<!-- v-model:sorting-order="sortingOrder" -->
<!-- @sorted="
    sortedRowsEmitted = $event.items.map(row => row.id),
    sortingOrderEmitted = $event.sortingOrder,
    sortByEmitted = sortBy
    " -->
</template>



<script setup>


let allProducts = reactive([]);

(async() => {
    let productsDbData = await $fetch(`/api/get-products`);
    Object.assign(allProducts, productsDbData);
    
})();



const columns = reactive([
    // { key: 'id', sortable: true, sortingOptions: ['desc', 'asc'] },
    { key: 'visible', sortable: true },
    { key: 'name', name: 'name', sortable: true,  sortingOptions: ['desc', 'asc']},
    { key: 'quantity', name: 'quantity', sortable: true, sortingOptions: ['desc', 'asc'] },
    { key: 'price', sortable: true },
    { key: 'added_on_timestamp', label: 'added on', sortable: true, sortingOptions: ['desc', 'asc'] },
    // { key: 'address.city', name: 'city', label: 'Quantity', sortable: true },
    // { key: 'phone' },
]);

    
function sortByOptions () {
    return columns
    .map(({ name, key, sortable }) => sortable && (name || key))
    .filter(Boolean)
};


{/* <va-alert class="mt-3" color="info" outline>
    <span v-if="sortingOrder">
    Sorted items order (showing id):
    <va-chip v-show="!!sortedRowsEmitted.length">{{ sortedRowsEmitted.join(' --> ') }}</va-chip>
    <va-chip v-show="!!sortingOrderEmitted">{{ sortingOrderEmitted }}</va-chip>
    <va-chip v-show="!!sortByEmitted">{{ sortByEmitted }}</va-chip>
    </span>
    <span v-else>
    Unsorted items order (showing id):
    <va-chip v-show="!!sortedRowsEmitted.length">{{ sortedRowsEmitted.join(', ') }}</va-chip>
    </span>
</va-alert> */}

</script>



<style lang="scss" scoped>



</style>