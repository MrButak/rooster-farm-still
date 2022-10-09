import { ref } from 'vue';
let showFlame = ref(false);

let shoppingCart = reactive({
    item_count: 0
});

export { showFlame, shoppingCart }