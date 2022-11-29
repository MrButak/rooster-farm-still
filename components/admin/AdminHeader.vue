<template>

<div style="position: relative;">
    <va-app-bar>
        <va-button 
            icon="menu" color="#fff" preset="plain" 
            @click="adminStore.sidebarShown = !adminStore.sidebarShown"
        />
        <va-spacer />
        <va-button color="#fff" preset="plain">Login</va-button>
    </va-app-bar>
</div>

</template>

<script setup>

import { 
    useAdminStore
    // sidebarShown 
} from '../../services/stateStore';

// Pinia store
const adminStore = useAdminStore();

</script>
