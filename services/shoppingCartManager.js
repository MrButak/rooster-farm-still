import { isLocalStorageAvailable, isItemInLs, setItemInLs, getItemFromLs } from './lsManager.js';

function isItemAlreadyInShoppingCart(shoppingCart, itemId) {

    if(!isLocalStorageAvailable) { return }; // TODO: get from State

    // TODO: could do a findIndex() here
    return shoppingCart.findIndex(product => product.id === itemId) !== -1;
    
    // shoppingCart.forEach((product) => {
    //     if(product.id === itemId) {
    //         return true;
    //     };
    // });
    // return false;
};

function getTotalItemsInShoppingCart() {

    if(!isLocalStorageAvailable) { return }; // TODO: get from State
    let shoppingCart = getItemFromLs('RVSshoppingCart');
    let itemCount = 0;
    console.log(shoppingCart)
    shoppingCart.forEach((product) => itemCount += product.quantity);
    return itemCount;
};

function addItemToShoppingCart(item, quantity) {

    if(!isLocalStorageAvailable) { return }; // TODO: get from State

    // Shopping cart not in local storage
    if(!isItemInLs('RVSshoppingCart')) {
        setItemInLs('RVSshoppingCart', [item]);
        return;
    };

    // Shopping cart is in local storage
    let shoppingCart = getItemFromLs('RVSshoppingCart');

    // Item not in shopping cart
    if(!isItemAlreadyInShoppingCart(shoppingCart, item.id)) {
        shoppingCart.push(item);
        setItemInLs('RVSshoppingCart', shoppingCart);
        return;
    };

    // Item is in shopping cart
    shoppingCart.findIndex(product => product.id == item.id)

};
// exports.pairSumTwo = pairSumTwo;
export { isItemAlreadyInShoppingCart, addItemToShoppingCart, getTotalItemsInShoppingCart };
