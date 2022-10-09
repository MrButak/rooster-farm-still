import { ref } from 'vue';
let showFire = ref(false);

let shoppingCart = reactive({
    item_count: 0
});

export { showFire, shoppingCart }