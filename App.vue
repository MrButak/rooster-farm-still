<template>

<NuxtPage />
<Footer />
<va-button-toggle v-model="theme" :options="themeOptions" class="ml-2" />

</template>



<script setup>

import { ref, watchEffect, toRef, onMounted } from 'vue';
import { useColors } from 'vuestic-ui';
import { localStorageAvailable, setItemInLs, isItemInLs } from './services/lsManager';
import { useUiStore, useShoppingCartStore } from './services/stateStore';

// Look at LS and total up the items. Function determines the number in the shopping cart
onMounted(() => {
    // Consider checking DB products price against LS and update LS if needed
    // Get the total items in user's shopping cart
    shoppingCartStore.calculateTotalItemCountInShoppingCart();
});

// Pinia store
const uiStore = useUiStore()
const shoppingCartStore = useShoppingCartStore();

// Vuestic color presets, light/dark mode, theme colors
const { presets, applyPreset, colors } = useColors();
let theme = ref(null);

// When the window Object is available
if(process.client) {

    // Default color theme is dark
    uiStore.colorTheme = theme.value = window.localStorage.getItem('vuestic-docs-theme')?.toLowerCase() || 'dark';
    
    // If color theme is not yet in local storage, set it
    if(localStorageAvailable && !isItemInLs('vuestic-docs-theme')) {
        setItemInLs('vuestic-docs-theme', 'dark');
        uiStore.colorTheme = 'dark';
    };
};
// When color theme is changed dark/light, update local storage
watchEffect(() => {
    if(localStorageAvailable) {
        setItemInLs('vuestic-docs-theme', theme.value);
        uiStore.colorTheme = theme.value;
    };
    applyPreset(theme.value)
});

// const primaryColorVariants = ['#2c82e0', '#ef476f', '#ffd166', '#06d6a0', '#8338ec'];
// const primaryColor = toRef(colors, 'primary');
let themeOptions = Object.keys(presets.value).map((themeName) => ({
    value: themeName,
    label: themeName
}));


</script>

<style lang="scss">

body {
    // Relavtive body + absolute footer with bottom: 0 == footer stays at the bottom
    position: relative;
    min-height: 100vh;
}

// * {
//     font-family: Arial, Helvetica, sans-serif;
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
// }
// p {
//     color: #EBF1F4   
// }
</style>