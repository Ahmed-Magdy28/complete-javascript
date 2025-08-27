'use strict';
import 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, APIKEY } from './config';
import { getJSON, sendJSON } from './helpers';


export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        currentPage: 1,
    },
    bookmarks: [],
};


const createRecipeObject = (data) => {
    const {recipe} = data.data;
    if (!recipe) throw new Error('Recipe not found');
    return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            ...(recipe.key && { key: recipe.key })
        };
        
};

export const loadRecipe = async (id) => {

    try {
        // fetching data
        const data = await getJSON(`${API_URL}${id}?key=${APIKEY}`);
        
        state.recipe = createRecipeObject(data);
        state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === state.recipe.id) ? true : false

    } catch (error) {
        console.error(`${error} 💥💥💥`);
        throw error;
    }

};

export const loadSearchResults = async (query) => {
    try {
        // const data = await getJSON(`${API_URL}?search=${query}&key=${APIKEY}`);
        const data = await getJSON(`${API_URL}?search=${query}&key=${APIKEY}`);
        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && { key: recipe.key })
            };
        });
        state.search.currentPage = 1;

    } catch (error) {
        console.error(`${error} 💥💥💥`);
        throw error;
    }
};




export const getSearchResultsPage = (page = state.search.currentPage) => {
    state.search.currentPage = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
};


export const updateServings = (newServings) => {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
    });
    state.recipe.servings = newServings;
};


const persistBookmarks = () => {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = (recipe) => {
    state.bookmarks.push(recipe);
    // mark the current recipe as bookmarked
    if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;
    persistBookmarks();


};

export const deleteBookmark = (id) => {
    // the index of the bookmark to delete
    const index = state.bookmarks.findIndex(el => el.id === id);
    // Deleting the bookmark
    state.bookmarks.splice(index, 1);
    // mark the current recipe as not bookmarked
    if (state.recipe.id === id) state.recipe.bookmarked = false;
    persistBookmarks();
}

const ingredientsMaker = (newRecipe) => {
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map(ing => {
        const ingArr = ing[1].split(',').map(el=> el.trim());
        if (ingArr.length !== 3) throw new Error('Wrong ingredient format! Please use the correct format :)');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
    });
    return ingredients;
};

export const uploadRecipe = async (newRecipe) => {
    try {
        const ingredients = ingredientsMaker(newRecipe);

        const recipe = {
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            servings: +newRecipe.servings,
            cooking_time: +newRecipe.cookingTime,
            ingredients: ingredients,
        };
        const data = await sendJSON(`${API_URL}?key=${APIKEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);

    } catch (error) {
        throw error
    }
};


const init = () => {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}

init();