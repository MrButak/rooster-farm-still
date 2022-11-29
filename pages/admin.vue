<template>

<AdminHeader />

<span class="admin-panel-wrapper">
    
    <AdminSidebar />

    <span class="admin-viewed-content-wrapper">
        <span class="admin-viewed-content-inner-wrapper">
            <span class="admin-viewed-content-component-wrapper">
                <AdminHelp />
            </span>
            <span class="admin-viewed-content-component-wrapper">
                <AdminHelp />
            </span>
            <span class="admin-viewed-content-component-wrapper">
                <AdminHelp />
            </span>
        </span>
    </span>
    
</span>

</template>

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
    height: 100%;
    border-radius: .6rem;
}
.admin-viewed-content-component-wrapper {
    border: 1px solid;
    border-radius: 0.6rem;
    padding: .4rem;
}

@media only screen and (max-width: 640px)  {
    .admin-viewed-content-wrapper {
        
    }
    
}
</style>