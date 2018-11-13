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
}