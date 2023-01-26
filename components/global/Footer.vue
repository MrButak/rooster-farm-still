<template>

<!-- Space above -->
<div class="h-24"></div>

<footer 
    class="absolute bottom-0 w-full text-center py-2 bg-black">
    <va-switch
    v-model="colorThemeValue"
    color="#5123a1"
    off-color="#ffd300"
    style="---checker-background-color: #252723;"
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
    <p class="text-white">© Rooster Valley Stills</p>
</footer>

</template>


<script setup>

import { ref, watchEffect } from 'vue';
import { useColors } from 'vuestic-ui';
import { localStorageAvailable, setItemInLs, isItemInLs, getItemFromLs } from '~~/services/lsManager';
import { useUiStore } from '~~/services/stateStore';

let themeSwitchIcon = computed(() => { return colorThemeValue ? 'dark_mode' : 'light_mode'})

// Pinia store
const uiStore = useUiStore()

// Vuestic color presets, light/dark mode, theme colors
const { applyPreset } = useColors();
let theme = ref(getItemFromLs('vuestic-docs-theme'));
let colorThemeValue = ref(theme.value == 'dark');
let themeSet = false; // know when the color theme has been set

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
    }
    themeSet = true;
    // If theme color is not in LS, the initial value will be null
    if(!theme.value) { theme.value = 'light' }

    setItemInLs('vuestic-docs-theme', theme.value);
    applyPreset(theme.value); 
};

</script>
