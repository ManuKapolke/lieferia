loadAllFromLocalStorage();

function render() {
    renderHeartIcon();
    renderMeals();
    renderBasket();
    renderBasketMobileButton();
}


/*-------------------------------------
Heart-Icon
--------------------------------------*/
function renderHeartIcon() {
    document.getElementById('heart').src = `img/${getHeartIcon()}`;
}


function getHeartIcon() {
    return shopIsLiked ? 'heart_filled.png' : 'heart.png';
}


function toggleHeartIcon() {
    shopIsLiked = !shopIsLiked;
    renderHeartIcon();
    saveToLocalStorage(Array(shopIsLiked), 'shopIsLiked');
}


/*-------------------------------------
Meals
--------------------------------------*/
function renderMeals() {
    renderMealsByCategory('starters');
    renderMealsByCategory('salads');
    renderMealsByCategory('pizza');
    renderMealsByCategory('pasta');
}


function renderMealsByCategory(category) {
    const section = document.getElementById(category);
    const mealsOfCategory = getMealsOfCategory(category);

    for (let i = 0; i < mealsOfCategory.length; i++) {
        const index = meals.indexOf(mealsOfCategory[i]);
        const mealContainer = createMealContainer(index);
        section.appendChild(mealContainer);
        renderMeal(index);
    }
}


function getMealsOfCategory(category) {
    return meals.filter(obj =>
        obj.category === category
    );
}


function createMealContainer(index) {
    const mealContainer = createDiv('meal', index);
    mealContainer.onclick = function () { addToBasket(index); };
    return mealContainer;
}


function createDiv(name, index) {
    return createElementWithIdAndClass('div', `${name}-${index}`, name);
}


function createElementWithIdAndClass(elemTag, elemId = '', elemClass = '') {
    const element = document.createElement(elemTag);
    if (elemId) element.id = elemId;
    if (elemClass) element.classList.add(elemClass);
    return element;
}


function renderMeal(index) {
    const mealContainer = document.getElementById(`meal-${index}`);
    mealContainer.innerHTML = '';
    mealContainer.appendChild(createDiv('description', index));
    mealContainer.appendChild(createDiv('plus-icon', index));

    renderDescription(index);
    renderPlusIcon(index);
}


function renderDescription(index) {
    const description = document.getElementById(`description-${index}`);
    description.innerHTML = `<h4>${meals[index].name}</h4>`;
    description.innerHTML += `<p class="ingredients">mit ${meals[index].ingredients}</p>`;
    if (meals[index].toChoose.length)
        description.innerHTML += `<p class="to-choose">Wahl aus: ${meals[index].toChoose.join(', ')}.</p>`;
    description.innerHTML += `<span class="price">${getPriceAsString(meals[index].price)} €</span>`;
}


function getPriceAsString(price) {
    return price.toFixed(2).replace('.', ',');
}


function renderPlusIcon(index) {
    const plusIcon = document.getElementById(`plus-icon-${index}`);
    plusIcon.innerHTML = meals[index].inBasket ? `${meals[index].inBasket}` : renderPlusIconSVG();
}


function renderPlusIconSVG(id = '') {
    let setId = id ? `id="${id}" ` : '';
    return `
        <svg ${setId}height="34" width="34">
            <line x1="7" y1="17" x2="27" y2="17" />
            <line x1="17" y1="7" x2="17" y2="27" />
            Sorry, your browser does not support inline SVG.
        </svg>
    `;
}


function renderMinusIconSVG(id = '') {
    let setId = id ? `id="${id}" ` : '';
    return `
        <svg ${setId}height="34" width="34">
            <line x1="7" y1="17" x2="27" y2="17" />
            Sorry, your browser does not support inline SVG.
        </svg>
    `;
}


/*-------------------------------------
Highlight Nav-Item on scroll
--------------------------------------*/
let navLinks = document.querySelectorAll('.navbar-content a');
let sections = document.querySelectorAll('section');

window.addEventListener('scroll', function () {
    let currentSection = getCurrentSection();
    activateNavLink(currentSection);
});


function getCurrentSection() {
    let currentSection = '';

    sections.forEach(function (section) {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - sectionHeight / 4) {
            currentSection = section.getAttribute('id');
        }
    });

    return currentSection;
}


function activateNavLink(currentSection) {
    navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}