import { ref, reactive } from 'vue';
// import pkg from '@googlemaps/js-api-loader';
// const { Loader } = pkg;

let showFire = ref(false);
let allProducts = reactive([]);
let shoppingCartCount = ref(0);

let showOkPopupModal = ref(false);

export { showFire, shoppingCartCount, allProducts, showOkPopupModal }
