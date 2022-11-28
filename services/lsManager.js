function localStorageAvailable() {

    let test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } 
    catch(error) {
        console.log(error);
        return false;
    };
};

function getItemFromLs(itemName) {

    try {
        return JSON.parse(localStorage.getItem(itemName));
    }
    catch(error) {
        console.log(error);
        return false;
    };
};

function setItemInLs(itemName, item) {

    try {
        localStorage.setItem(itemName, item);
        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    };
};

function isItemInLs(itemName) {

    try {
        return localStorage.getItem(itemName);
    }
    catch(error) {
        return false;
    };
};

export { localStorageAvailable, getItemFromLs, setItemInLs, isItemInLs }
