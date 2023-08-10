
const MIN_ORDER_VALUE = 10;
let shopIsLiked = false;
const idxAddedToBasket = [];
let mobileBasketIsActive = false;

const starters = [
    {
        "category": "starters",
        "name": "Mozzarella Caprese",
        "ingredients": "frischen Tomaten, Mozzarella und Basilikum",
        "toChoose": [],
        "price": 8.60,
        "inBasket": 0
    }
    ,
    {
        "category": "starters",
        "name": "Bruschetta",
        "ingredients": "frischen Tomaten, Knoblauch und Basilikum",
        "toChoose": [],
        "price": 5.90,
        "inBasket": 0
    }
    ,
    {
        "category": "starters",
        "name": "Antipasti della Casa",
        "ingredients": "verschiedenen Vorspeisen nach Art des Hauses",
        "toChoose": [],
        "price": 15.90,
        "inBasket": 0
    }
];

const salads = [
    {
        "category": "salads",
        "name": "Insalata Mista",
        "ingredients": "grünem Salat, Tomaten, Gurken und Zwiebeln",
        "toChoose": ["Essig-Öl-Dressing", "Joghurt-Dressing", "Cocktail-Dressing"],
        "price": 5.90,
        "inBasket": 0
    }
    ,
    {
        "category": "salads",
        "name": "Insalata Capriciosa",
        "ingredients": "grünem Salat, Tomaten, Gurken, Zwiebeln, Artischocken, Ei, Feta, Oliven",
        "toChoose": ["Essig-Öl-Dressing", "Joghurt-Dressing", "Cocktail-Dressing"],
        "price": 7.90,
        "inBasket": 0
    }
];

const pizzas = [
    {
        "category": "pizza",
        "name": "Pizza Margherita",
        "ingredients": "Tomaten und Mozzarella",
        "toChoose": ["Normal, Ø 32cm", "Familie, Ø 48cm"],
        "price": 8.50,
        "inBasket": 0
    }
    ,
    {
        "category": "pizza",
        "name": "Pizza Funghi",
        "ingredients": "frischen Champignons",
        "toChoose": ["Normal, Ø 32cm", "Familie, Ø 48cm"],
        "price": 8.90,
        "inBasket": 0
    }
    ,
    {
        "category": "pizza",
        "name": "Pizza Spinaci",
        "ingredients": "Spinat und Knoblauch",
        "toChoose": ["Normal, Ø 32cm", "Familie, Ø 48cm"],
        "price": 9.50,
        "inBasket": 0
    }
    ,
    {
        "category": "pizza",
        "name": "Pizza Rucola",
        "ingredients": "frischen Tomaten und Rucola",
        "toChoose": ["Normal, Ø 32cm", "Familie, Ø 48cm"],
        "price": 9.50,
        "inBasket": 0
    }
    ,
    {
        "category": "pizza",
        "name": "Pizza Pappa",
        "ingredients": "Artischocken, Peperoni, grünen Oliven und Kapern",
        "toChoose": ["Normal, Ø 32cm", "Familie, Ø 48cm"],
        "price": 11.50,
        "inBasket": 0
    }
];

const pasta = [
    {
        "category": "pasta",
        "name": "Spaghetti alla Napoletana",
        "ingredients": "frischer Tomatensauce und Basilikum",
        "toChoose": [],
        "price": 8.90,
        "inBasket": 0
    }
    ,
    {
        "category": "pasta",
        "name": "Spaghetti al Pesto",
        "ingredients": "frischem Pesto",
        "toChoose": [],
        "price": 9.90,
        "inBasket": 0
    }
];

const meals = starters.concat(salads, pizzas, pasta);