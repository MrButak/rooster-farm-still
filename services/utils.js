// import { ref, watchEffect, toRef } from 'vue';
// import { useColors } from 'vuestic-ui';
// const { presets, applyPreset, colors } = useColors();
// const theme = ref(localStorage.getItem('vuestic-docs-theme')?.toLowerCase() || 'light')

// function initVuesticColorTheme() {

//     // Vuestic color presets, light/dark mode, theme colors
    
//     watchEffect(() => {
//         applyPreset(theme.value)
//     });

//     let themeOptions = Object.keys(presets.value).map((themeName) => ({
//         value: themeName,
//         label: themeName
//     }));
//     const primaryColorVariants = ['#2c82e0', '#ef476f', '#ffd166', '#06d6a0', '#8338ec'];
//     const primaryColor = toRef(colors, 'primary');

// };

// export { initVuesticColorTheme };
