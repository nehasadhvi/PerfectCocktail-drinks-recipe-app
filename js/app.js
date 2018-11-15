//Instantiate the classes
const ui = new UI(),
    cocktail = new CocktailAPI(),
    cocktaildb = new CocktailDB();

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
            cocktaildb.removeFromLS(e.target.getAttribute('data-id'));
        } else {
            e.target.classList.add('is-favorite');
            e.target.innerHTML = '-';
        }

        let cartBody = e.target.parentElement;

        let drinksInfo = {
            id: e.target.dataset.id,
            name: cartBody.querySelector('.card-title').textContent,
            image: cartBody.querySelector('.card-img-top').src
        };

        cocktaildb.saveIntoDB(drinksInfo);
    }

}

function documentReady() {

    ui.getFavouritesFromDB();

    const searchCategory = document.querySelector('.search-category');
    if(searchCategory){
        ui.displayCategories();
    }

    //Load contents of Favourites page
    const favouriteTable = document.getElementById('favorites');

    if(favouriteTable) {
        const drinks = cocktaildb.getFromDB();
        ui.getFavourites(drinks);

        favouriteTable.addEventListener('click', (e) => {
            e.preventDefault();

            if(e.target.classList.contains('get-recipe')) {
                cocktail.getSingleRecipe(e.target.getAttribute('data-id'))
                    .then(recipe => {
                        ui.displaySingleRecipe(recipe.drinks[0]);
                    })
            }

            if(e.target.classList.contains('remove-recipe')) {
                //Remove from DOM
                e.target.parentElement.parentElement.remove();

                //Remove from Local Storage
                cocktaildb.removeFromLS(e.target.dataset.id);
            }
        });
        
    }
}