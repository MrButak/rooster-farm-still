<template>

<NuxtPage />
<Footer />
<va-button-toggle v-model="theme" :options="themeOptions" class="ml-2" />
</template>



<script setup>

import { ref, watchEffect, toRef, onMounted } from 'vue';
import { useColors } from 'vuestic-ui';
import { getTotalItemCountInShoppingCart } from './services/shoppingCartManager';

// Vuestic color presets, light/dark mode, theme colors
const { presets, applyPreset, colors } = useColors();
let theme = ref(null);
// When the window Object is available
if(process.client) {
    theme.value = window.localStorage.getItem('vuestic-docs-theme')?.toLowerCase() || 'dark';    
};
watchEffect(() => {
    applyPreset(theme.value)
});
const primaryColorVariants = ['#2c82e0', '#ef476f', '#ffd166', '#06d6a0', '#8338ec'];
const primaryColor = toRef(colors, 'primary');
let themeOptions = Object.keys(presets.value).map((themeName) => ({
    value: themeName,
    label: themeName
}));


// Look at LS and total up the items. Function determines the number in the shooping cart
onMounted(() => {
    // initVuesticColorTheme();
    // Consider checking DB products price against LS and update LS if needed
    getTotalItemCountInShoppingCart();
});





    

    // return {
    //   theme,
    //   themeOptions: Object.keys(presets.value).map((themeName) => ({
    //     value: themeName,
    //     label: themeName,
    //   })),

    //   primaryColor,
    //   primaryColorVariants,
    // }


</script>

<style lang="scss">

body {
    // Relavtive body + absolute footer with bottom: 0 == footer stays at the bottom
    position: relative;
    min-height: 100vh;
    // background-color: #FDFDFD;
    
    
}

// * {
//     font-family: Arial, Helvetica, sans-serif;
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
// }

</style>