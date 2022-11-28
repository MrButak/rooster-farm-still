import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
    state: () => ({
        allProducts: []
    })
    
});

export const useOrderStore = defineStore('orderStore', {
    state: () => ({
        userShippingData: {
            addressField1: '',
            addressField2: '',
            cityField: '',
            regionField: '',
            postalField: '',
            countryField: '',
            additionalNote: ''
        },
        currentCheckoutStep: 1,
        // This data is gotten when the user is at OrderSummary.vue. The items in the shopping cart are compared to the items from a DB call. This is to ensure the price was not tampered with in LS
        userProductsToShip: [],
        subTotal: 0,
        shoppingCartCount: 0
    })
});

export const useUiStore = defineStore('uiStore', {
    state: () => ({
        showFire: false,
        colorTheme: '',
        // Know when 3rd pary scripts have been loaded. I'm having an issue where they are loaded multiple times. I've tried to put them in nuxt.config, but they are still loaded multiple times. So this Boolean will let me know whether to load them or not.
        thirdPartyScriptsLoaded: false
    })
});

export const useAdminStore = defineStore('adminStore', {
    state: () => ({
        // ui helpers
        sidebarShown: false
    })
});
