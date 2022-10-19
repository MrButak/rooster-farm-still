import { ref, reactive, computed } from 'vue';

let showFire = ref(false);
let allProducts = reactive([]);
let shoppingCartCount = ref(0);

let showOkPopupModal = ref(false);

export { showFire, shoppingCartCount, allProducts, showOkPopupModal }