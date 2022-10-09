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

function setItemInLs(itemsToSet) { // object {item1: item1data, item2: item2data}

    let keys = Object.keys(itemsToSet);
    keys.forEach((key) => {
        localStorage.setItem(key, itemsToSet[`${key}`]);
    });

};

export { isLocalStorageAvailable, setItemInLs }