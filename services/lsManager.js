function isLocalStorageAvailable() {

    let test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } 
    catch(err) {
        console.log(err);
        return false;
    };
};

function setItemInLs(itemName, itemToSet) { // String, Array of Objects

    localStorage.setItem(itemName, JSON.stringify(itemToSet));
};

function isItemInLs(itemName) {
    
    return localStorage.getItem(itemName);
};

function getItemFromLs(itemName) {

    return JSON.parse(localStorage.getItem(itemName));
};

export { isLocalStorageAvailable, setItemInLs, isItemInLs, getItemFromLs }