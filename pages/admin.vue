<template>

<AdminHeader />

<span class="admin-panel-wrapper">
    
    <AdminSidebar />

    <span class="admin-viewed-content-wrapper">
        <span class="admin-viewed-content-inner-wrapper">

            <span v-if="adminStore.activeRouteName == 'home'" class="admin-viewed-content-component-wrapper">
                <AdminHome />
            </span>

            <span v-else-if="adminStore.activeRouteName == 'productsManage'" style="display:flex;flex-direction:column;gap: 1.8rem">
                <span class="admin-viewed-content-component-wrapper">
                    <ProductsManage />
                </span>
                <span v-if="adminStore.showEditProductComponent" class="admin-viewed-content-component-wrapper">
                    <ProductsEdit />
                </span>
            </span>
            

        </span>
    </span>
    
</span>

</template>



<script setup>

import { onMounted } from 'vue';
import { useAdminStore } from '~~/services/stateStore';
import ProductsManage from '~~/components/admin/products/productsManage/ProductsManage.vue';
import ProductsEdit from '~~/components/admin/products/productsManage/productsEdit/ProductsEdit.vue';

import { useColors } from 'vuestic-ui';
const { applyPreset } = useColors();
nextTick(() => {
    applyPreset(getItemFromLs('vuestic-docs-theme'))
})

// Pinia store
const adminStore = useAdminStore();

</script>



<style lang="scss" scoped>
.admin-panel-wrapper {
    display: flex;
    height: 102vh;
    padding: 1.8rem;
    gap: 1.8rem;
}
.admin-viewed-content-wrapper {
    display: flex;
    height: calc(100vh - 3.6rem);
    overflow: scroll;
    flex: 1 1 0;
}
.admin-viewed-content-inner-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    width: 100%;
    height: 100%;
    border-radius: .6rem;
}
.admin-viewed-content-component-wrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-radius: 0.6rem;
    padding: .4rem;
}

@media only screen and (max-width: 640px)  {
    .admin-viewed-content-wrapper {
        
    }
    
}
</style>