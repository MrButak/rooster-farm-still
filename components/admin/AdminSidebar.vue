<template>

<div v-if="adminStore.sidebarShown" class="sidearea-wrapper">
<va-accordion
    class="sidebar-wrapper"
    v-model="accordionValue" multiple
    >
    <va-collapse
        v-for="(route, idx) in adminStore.sidebarItems"
        :key="idx"
        :class="{ expanded: accordionValue[idx] && route.children }"
    >
    <template #header>
        <va-sidebar-item
            :active="adminStore.isRouteActive(route)"
            @click="adminStore.setRouteActive(route)"
        >
            <va-sidebar-item-content>
            <va-sidebar-item-title>
                <va-icon :name="route.icon"></va-icon>
                {{ route.displayName }}
            </va-sidebar-item-title>
            <va-icon v-if="route.children" :name="accordionValue[idx] ? 'expand_less' : 'expand_more'" />
            </va-sidebar-item-content>
        </va-sidebar-item>
    </template>
    <va-sidebar-item
        v-for="(child, index) in route.children" :key="index"
        :active="adminStore.isRouteActive(child)"
        @click="adminStore.setRouteActive(child)"
    >
    <va-sidebar-item-content>
        <va-sidebar-item-title>
            <span class="child-item">
                <va-icon 
                :name="child.icon" >
                </va-icon>
                {{ child.displayName }}
            </span>
        </va-sidebar-item-title>
    </va-sidebar-item-content>
    </va-sidebar-item>
</va-collapse>
</va-accordion>
</div>

</template>



<script setup>

import { useAdminStore } from '../../services/stateStore';

// Pinia store
const adminStore = useAdminStore();

let accordionValue = reactive([false, true]);

</script>


<style lang="scss">

.sidearea-wrapper {

    height: calc(100vh - 3.6rem);
    overflow: scroll;
    // background-color: white;
    width: 16rem;
}
.sidebar-wrapper {
    height: 100%;
    border-radius: .6rem;
    overflow: scroll;
    border: 1px solid;
}

@media only screen and (max-width: 640px)  {
     
    .sidearea-wrapper {
        position: absolute;
        // background-color: none;
    }
}

</style>