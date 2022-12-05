<template>

<NuxtPage />
<Footer />
<va-switch
    v-model="colorThemeValue"
    color="#5123a1"
    off-color="#ffd300"
    style="--va-switch-checker-background-color: #252723;"
>
    <template #innerLabel>
    <div class="va-text-center">
        <va-icon
        size="24px"
        :name="themeSwitchIcon"
        />
    </div>
    </template>
</va-switch>

</template>



<script setup>

import { ref, watchEffect, toRef, onMounted } from 'vue';
import { useColors } from 'vuestic-ui';
import { localStorageAvailable, setItemInLs, isItemInLs, getItemFromLs } from './services/lsManager';
import { useUiStore, useShoppingCartStore } from './services/stateStore';

// Look at LS and total up the items. Function determines the number in the shopping cart
onMounted(() => {
    // Consider checking DB products price against LS and update LS if needed
    // Get the total items in user's shopping cart
    shoppingCartStore.calculateTotalItemCountInShoppingCart();
});
let themeSwitchIcon = computed(() => { return colorThemeValue ? 'dark_mode' : 'light_mode'})

// Pinia store
const uiStore = useUiStore()
const shoppingCartStore = useShoppingCartStore();

// Vuestic color presets, light/dark mode, theme colors
const { applyPreset } = useColors();
let theme = ref(getItemFromLs('vuestic-docs-theme'));
let colorThemeValue = ref(theme.value == 'dark');
let themeSet = false;

// If color theme is not yet in local storage, set it
if(localStorageAvailable && !isItemInLs('vuestic-docs-theme')) {
    setItemInLs('vuestic-docs-theme', 'light');
    uiStore.colorTheme = 'light';
};

watchEffect(() => {
    changeColorTheme(colorThemeValue.value)
})

function changeColorTheme() {
    // themeSet is initially set to false. If not the theme will change/unchange on app load
    if(themeSet) {

        theme.value =
            theme.value == 'light' ?
                theme.value = 'dark' :
                theme.value = 'light';
        // if(theme.value == 'light') {
        // theme.value = 'dark';
        // }
        // else {
        //     theme.value = 'light'; 
        // }
    }
    themeSet = true;
    // If theme color is not in LS, the initial value will be null
    if(!theme.value) { theme.value = 'light' }

    setItemInLs('vuestic-docs-theme', theme.value);
    applyPreset(theme.value); 
};

</script>

<style lang="scss">
// TODO: use a computed property for the body background-color
body {
    // Relavtive body + absolute footer with bottom: 0 == footer stays at the bottom
    position: relative;
    min-height: 100vh;
}

</style>