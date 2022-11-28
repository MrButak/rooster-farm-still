<template>


<AdminHeader />

<span style="display: flex;">
    
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

.admin-viewed-content-wrapper {
    display: flex;
    padding: 2rem;
    height: calc(100vh - 3.6rem);
    overflow: scroll;
    padding: 2rem 2rem 2rem 0;
    flex: 1 1 0;
}
.admin-viewed-content-inner-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    border-radius: .6rem;
    // overflow: scroll;
    // border: 1px solid;
    // padding: .2rem;
    
}
.admin-viewed-content-component-wrapper {
    border: 1px solid;
    border-radius: 0.6rem;
    padding: .4rem;
}
</style>