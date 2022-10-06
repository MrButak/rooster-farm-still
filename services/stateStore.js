import { ref } from 'vue';
let showFlame = ref(false);
let productsData = reactive([
    {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image_url: '',
        category: ''
    },
    {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image_url: '',
        category: ''
    },
    {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image_url: '',
        category: ''
    },
    {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image_url: '',
        category: ''
    },
]);

let dataFetched = ref(false);
export { showFlame, productsData, dataFetched }