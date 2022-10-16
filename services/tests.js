import { isItemInShoppingCart } from './shoppingCartManager.js';


// ********* shoppingCartManger.js Tests ********* //
function testShoppingCartManager() {

    const shoppingCart = [
        { id: 2, name: '6 Gallon Still' },
        { id: 1, name: '12 Gallon Still' },
        { id: -1, name: '6 Gallon Still Complete' }
    ];
    console.assert(isItemInShoppingCart(shoppingCart, 2));
};

testShoppingCartManager();
