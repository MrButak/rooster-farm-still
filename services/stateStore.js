import { ref, reactive } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

let showFire = ref(false);
let allProducts = reactive([]);
let shoppingCartCount = ref(0);

let showOkPopupModal = ref(false);

export { showFire, shoppingCartCount, allProducts, showOkPopupModal, Loader }
