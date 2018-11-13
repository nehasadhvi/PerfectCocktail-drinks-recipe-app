class UI{

    displayCategories() {
        const categories = cocktail.getCategories()
            .then(categories => {
                const catList = categories.drinks;
                console.log(catList);
                const options = document.createElement('option'),
                    searchItem = document.getElementById('search');
                options.textContent =  '- Select -';
                options.value = '';
                searchItem.appendChild(options);

                catList.forEach(category => {
                    const options = document.createElement('option');
                    options.textContent = category.strCategory;
                    options.value = category.strCategory.split(' ').join('_');
                    searchItem.appendChild(options);
                });
            });
    }

    displayDrinksWithoutIngredients(drinks){
        const resultWrapper = document.querySelector('.results-wrapper');
        resultWrapper.style.display = 'block';

        const resultsDiv = document.getElementById('results');

        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
            <div class="col-md-4">
            <div class="card my-3">
                 <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                 +
                 </button>
                 <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                 <div class="card-body">
                      <h2 class="card-title text-center">${drink.strDrink}</h2>
                      <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
                 </div>
            </div>
            </div>
            `;
        });
    }

    displayDrinksWithIngredients(drinks) {
        const resultWrapper = document.querySelector('.results-wrapper');
        resultWrapper.style.display = 'block';

        const resultsDiv = document.getElementById('results');

        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                        +
                        </button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instructions: </p>
                            <p class="card-text">
                                    ${drink.strInstructions}
                            </p>
                            <p class="card-text">
                                    <ul class="list-group">
                                        <li class="list-group-item alert alert-danger">Ingredients</li>
                                        ${this.displayIngredients(drink)}
                                    </ul>
                            </p>
                            <p class="card-text font-weight-bold">Extra Information:</p>
                            <p class="card-text">
                                    <span class="badge badge-pill badge-success">
                                        ${drink.strAlcoholic}
                                    </span>
                                    <span class="badge badge-pill badge-warning">
                                        Category: ${drink.strCategory}
                                    </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    displayIngredients(drink){

        let ingredients = [];
        for(let i = 1; i< 16; i++){
            const ingredientList = {};
            if(drink[`strIngredient${i}`]){
                ingredientList.ingredient = drink[`strIngredient${i}`];
                ingredientList.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientList);
            }
        }
        
        let ingredientTemplate = '';
        ingredients.forEach(ingredient => {
            ingredientTemplate += `
                <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
            `;
        });
        return ingredientTemplate;
    }

    displaySingleRecipe(recipe){
        const modalTitle = document.querySelector('.modal-title'),
            modalDescription = document.querySelector('.modal-body .description-text'),
            modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions;
        modalIngredients.innerHTML = this.displayIngredients(recipe);
    }


    printMessage(message, className) {

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="alert alert-dismissible alert-${className}">
                <button type="button" class="close" data-dismiss="alert">x</button>
                ${message}
            </div>
        `;

        const reference = document.querySelector('.jumbotron h1');
        const parent = reference.parentElement;
        parent.insertBefore(div, reference);

        const msgAlert = document.querySelector('.alert');
        if(msgAlert) {
            setTimeout(() => {
                msgAlert.remove();
            }, 3000);
        }
    }

    clearResults() {
        const result = document.getElementById('results');
        results.innerHTML = "";
    }
}