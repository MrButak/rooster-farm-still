import { isLocalStorageAvailable, isItemInLs, setItemInLs, getItemFromLs } from './lsManager.js';

function isItemAlreadyInShoppingCart(shoppingCart, itemId) {

    if(!isLocalStorageAvailable) { return }; // TODO: get from State

    return shoppingCart.findIndex(product => product.id === itemId) !== -1;
};

function getTotalItemsInShoppingCart() {

    if(!isLocalStorageAvailable) { return }; // TODO: get from State
    let shoppingCart = getItemFromLs('RVSshoppingCart');
    let itemCount = 0;
    
    shoppingCart.forEach((product) => itemCount += product.quantity);
    return itemCount;
};

function addItemToShoppingCart(item, quantity) {
    
    if(!isLocalStorageAvailable) { return }; // TODO: get from State
    
    // Add user selected quantity to item
    item.quantity = quantity;

    // Shopping cart not in local storage
    if(!isItemInLs('RVSshoppingCart')) {
        console.log('helllll')
        setItemInLs('RVSshoppingCart', [item]);
        return;
    };

    // Shopping cart is in local storage
    let shoppingCart = getItemFromLs('RVSshoppingCart');

    // Item not in shopping cart
    if(!isItemAlreadyInShoppingCart(shoppingCart, item.id)) {
        console.log('not already in LS')
        shoppingCart.push(item);
        setItemInLs('RVSshoppingCart', shoppingCart);
        return;
    };

    console.log('already in LS', quantity)
    // Item is in shopping cart
    let productIndex = shoppingCart.findIndex(product => product.id == item.id)
    shoppingCart[productIndex].quantity += quantity;
    setItemInLs('RVSshoppingCart', shoppingCart);
};

export { isItemAlreadyInShoppingCart, addItemToShoppingCart, getTotalItemsInShoppingCart };
