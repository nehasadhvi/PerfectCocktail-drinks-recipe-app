class CocktailAPI{
    
    async getDrinksByName(drinkName){
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);
        const cocktails = await url.json();
        return {cocktails};
    }

    async getDrinksByIngredient(ingredient){
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const cocktails = await url.json();
        return {cocktails};
    }

    async getSingleRecipe(id){
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recipe = await url.json();
        return recipe;
    }

    async getCategories() {
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
        const categories = await url.json();
        return categories;
    }

    async getDrinksByCategory(category) {
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const cocktails = await url.json();
        return {cocktails};
    }

    async getDrinksByAlcohol(alcohol) {
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`);
        const cocktails = await url.json();
        return {cocktails};
    }
}