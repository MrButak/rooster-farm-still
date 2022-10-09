<template>

<div class="home-page-wrapper">
    <Header />
    <Fire />
    <Transition>
        <ProductsAtAGlance />
    </Transition>
    <Footer />
</div>
    
</template>

<script setup>
import ProductsAtAGlance from '~~/components/home/ProductsAtAGlance.vue';



const config = useRuntimeConfig();

async function testDbCall() {
    let testData = await $fetch('/api/test-db');
    console.log(testData);
};

</script>

<style lang="scss" scoped>

.home-page-wrapper {
    
    // background: #ffd00038;
    
    background-color: #fce37325;

}

.v-enter-active, .v-leave-active {
    transition: opacity 1.5s ease;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
}

</style>
    