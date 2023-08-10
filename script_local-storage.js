/*-------------------------------------
Local Storage
--------------------------------------*/
function saveAllToLocalStorage() {
    saveToLocalStorage(meals, 'meals');
    saveToLocalStorage(idxAddedToBasket, 'idxAddedToBasket');
    saveToLocalStorage(Array(shopIsLiked), 'shopIsLiked');
}


function loadAllFromLocalStorage() {
    loadArrayFromLocalStorage(meals, 'meals');
    loadArrayFromLocalStorage(idxAddedToBasket, 'idxAddedToBasket');

    shopIsLiked = Array(shopIsLiked);
    loadArrayFromLocalStorage(shopIsLiked, 'shopIsLiked');
    shopIsLiked = shopIsLiked[0];
}


function saveToLocalStorage(thingToSave, thingName) {
    let thingAsString = JSON.stringify(thingToSave);
    localStorage.setItem(thingName, thingAsString);
}


function loadArrayFromLocalStorage(thingToLoad, thingName) {
    let thingAsString = localStorage.getItem(thingName);

    if (thingAsString) {
        let loadedArray = JSON.parse(thingAsString);
        thingToLoad.splice(0, thingToLoad.length, ...loadedArray);
    }
}