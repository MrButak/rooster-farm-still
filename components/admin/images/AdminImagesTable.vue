<template>
<div class="row">
        <va-input
        class="flex mb-2 md6 xs12"
        placeholder="Filter..."
        v-model="input"
        />
    </div>
    
    <!-- v-if="allProducts.length" -->
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
    <!-- DB id is value -->
    <template #cell(edit)="{ value }">
        <va-icon 
            size="small" 
            name="edit" 
            @click="selectedProductId = value"
            />
    </template>

    <template #header(images)="{ label }">
        <!-- <va-chip size="small">{{ label }}</va-chip> -->
        {{ label }}
    </template>

    <template #cell(images)="{ value }">
        
        <va-icon 
            size="small" 
            name="visibility" 
            
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

import { useAdminStore } from '~~/services/stateStore';
const adminStore = useAdminStore();
const config = useRuntimeConfig();

const input = ref('');

const columns = [
    { key: 'id', name: 'edit', label: 'edit' }, // passing the DB id here. When @click
    { key: 'visible', sortable: true },
    { key: 'name', sortable: true },
    { key: 'quantity', sortable: true },
    { key: 'price', sortable: true },
    { key: 'id', name: 'images', label: 'images' }, // passing the DB id here. When @click
    { key: 'added_on_timestamp', sortable: true },
]


</script>



<style lang="scss" scoped>



</style>