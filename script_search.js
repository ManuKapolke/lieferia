/*-------------------------------------
Search
--------------------------------------*/
function search() {
    let search = document.getElementById('search-input').value;

    showCategories();
    showMeals();
    removeNonrelevantMeals(search);
    removeNonrelevantCategories(search);
}


function removeNonrelevantMeals(search) {
    const mealsToRemove = getMealsToRemoveForSearch(search);

    for (let i = 0; i < mealsToRemove.length; i++) {
        const index = meals.indexOf(mealsToRemove[i]);
        removeElement(`meal-${index}`);
    }
}


function removeNonrelevantCategories(search) {
    const mealsToRemove = getMealsToRemoveForSearch(search);

    if (mealsToRemove.filter(obj => obj.category === 'starters').length === starters.length) removeElement('starters');
    if (mealsToRemove.filter(obj => obj.category === 'salads').length === salads.length) removeElement('salads');
    if (mealsToRemove.filter(obj => obj.category === 'pizza').length === pizzas.length) removeElement('pizza');
    if (mealsToRemove.filter(obj => obj.category === 'pasta').length === pasta.length) removeElement('pasta');
}


function getMealsToRemoveForSearch(searchString) {
    let search = searchString.toLowerCase();
    return meals.filter(obj =>
        !obj.name.toLowerCase().includes(search) &&
        !obj.ingredients.toLowerCase().includes(search) &&
        !obj.toChoose.toString().toLowerCase().includes(search) &&
        !getPriceAsString(obj.price).includes(search)
    )
}


function openSearch() {
    showElement('search-bar-container');
}


function closeSearch() {
    document.getElementById('search-input').value = '';
    removeElement('search-bar-container');
    showCategories();
    showMeals();
}


function showCategories() {
    showElement('starters');
    showElement('salads');
    showElement('pizza');
    showElement('pasta');
}


function showMeals() {
    for (let i = 0; i < meals.length; i++) {
        showElement(`meal-${i}`);
    }
}