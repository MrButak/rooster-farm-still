import { ref, reactive } from 'vue';
// import pkg from '@googlemaps/js-api-loader';
// const { Loader } = pkg;

let showFire = ref(false);
let allProducts = reactive([]); // check to see if this is used/imported anywhere
let shoppingCartCount = ref(0);

let showOkPopupModal = ref(false);

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

export { showFire, shoppingCartCount, allProducts, showOkPopupModal, 
    currentCheckoutStep, userShippingData,
    userProductsToShip, subTotal
}
