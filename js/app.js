const searchForm = document.getElementById('search-form');
const ui = new UI(),
    cocktail = new CocktailAPI();

if(searchForm) {
    searchForm.addEventListener('submit', getCocktails);
}

// eventListeners();

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