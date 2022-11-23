import { ref, reactive } from 'vue';

let showFire = ref(false);
let allProducts = reactive([]); // check to see if this is used/imported anywhere
let shoppingCartCount = ref(0);

// let showOkPopupModal = ref(false);
let colorTheme = ref('');

let currentCheckoutStep = ref(1);

let userShippingData = reactive({
    addressField1: '',
    addressField2: '',
    cityField: '',
    regionField: '',
    postalField: '',
    countryField: '',
    additionalNote: ''
});

// This data is gotten when the user is at OrderSummary.vue. The items in the shopping cart are compared to the items from a DB call. This is to ensure the price was not tampered with in LS
let userProductsToShip = reactive([]);
let subTotal = ref(null);

// Know when 3rd pary scripts have been loaded. I'm having an issue where they are loaded multiple times. I've tried to put them in nuxt.config, but they are still loaded multiple times.
let thirdPartyScriptsLoaded = ref(false);

export { showFire, shoppingCartCount, allProducts, 
    currentCheckoutStep, userShippingData,
    userProductsToShip, subTotal,
    thirdPartyScriptsLoaded,
    colorTheme
}
