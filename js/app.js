//Instantiate the classes
const ui = new UI(),
    cocktail = new CocktailAPI();

function eventListeners() {

    document.addEventListener('DOMContentLoaded', documentReady);

    //Add event Listeners when form is submitted
    const searchForm = document.getElementById('search-form');    
    if(searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }

    //Add event listeners when results div is clicked
    const resultsDiv = document.getElementById('results');
    if(resultsDiv){
        resultsDiv.addEventListener('click', resultsDelegation);
    }
}

eventListeners();

function getCocktails(e) {
    e.preventDefault();

    const searchValue = document.getElementById('search').value;

    if(!searchValue) {
        ui.printMessage('Please enter the value', 'danger');
    } else {

        let serverResponse;
        const type = document.querySelector('#type').value;

        switch(type) {
            case 'name':
                serverResponse = cocktail.getDrinksByName(searchValue);
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient(searchValue);
                break;
            case 'category':
                serverResponse = cocktail.getDrinksByCategory(searchValue);
                break;
            case 'alcohol':
                serverResponse = cocktail.getDrinksByAlcohol(searchValue);
                break;
        }

        ui.clearResults();

        serverResponse
            .then(cocktails => {
                if(cocktails.cocktails.drinks){
                    if(type === 'name') {
                        ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
                    } else {
                        ui.displayDrinksWithoutIngredients(cocktails.cocktails.drinks);
                    }
                } else {
                    ui.printMessage('This drink does not exists, please give another name', 'danger');
                }
            })
            .catch(err => console.log(err));
    }
}

function resultsDelegation(e) {
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')){
        cocktail.getSingleRecipe(e.target.getAttribute('data-id'))
            .then(recipe => {
                ui.displaySingleRecipe(recipe.drinks[0]);
            })
    }

    if(e.target.classList.contains('favorite-btn')) {
        if(e.target.classList.contains('is-favorite')) {
            e.target.classList.remove('is-favorite');
            e.target.innerHTML = '+';
        } else {
            e.target.classList.add('is-favorite');
            e.target.innerHTML = '-';
        }
    }

}

function documentReady() {
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory){
        ui.displayCategories();
    }
}