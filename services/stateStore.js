import { ref, reactive } from 'vue';

let showFire = ref(false);

let shallowProducts = reactive([]);

let shoppingCartCount = ref(0);
let shoppingCart = reactive([
    // {
    //     quantity: 0,
    //     item: {}
    // }
]);

export { showFire, shoppingCart, shoppingCartCount, shallowProducts }