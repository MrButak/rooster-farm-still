function localStorageAvailable() {

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

function getItemFromLs(itemName) {

    try {
        return JSON.parse(localStorage.getItem(itemName));
    }
    catch {
        return false;
    };
};

export { localStorageAvailable, getItemFromLs }
