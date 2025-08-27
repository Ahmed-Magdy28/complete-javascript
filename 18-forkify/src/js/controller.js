'use strict';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';
import 'regenerator-runtime/runtime'
import 'core-js/stable';




// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////


// if (model.hot) {
//   model.hot.accept();
// }

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    
    // 5ed6604591c37cdc054bc886
    
    if (!id) return;
    recipeView.renderSpinner();

    // update results view to mark selected recipe
    resultsView.update(model.getSearchResultsPage());
    // update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // loading recipe
    await model.loadRecipe(id);


    // rendering recipe
    recipeView.render(model.state.recipe);

  } catch (error) {
    recipeView.renderError(error);
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    // getting query
    const query = searchView.getQuery();
    // checking if query is valid
    if (!query) return;
    // loading search results
    await model.loadSearchResults(query);

    // rendering search results
    resultsView.render(model.getSearchResultsPage());

    // rendering pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
    recipeView.renderError(error.message);
  }
};


const controlPagination = (goToPage) => {
      // rendering new search results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // rendering pagination
    paginationView.render(model.state.search);
};


const controlServings = (newServings) => {
  // update the recipe servings
  model.updateServings(newServings);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};


const controlAddBookmark = () => {
  // add or remove bookmark
  model.state.recipe.bookmarked ? model.deleteBookmark(model.state.recipe.id) : model.addBookmark(model.state.recipe);
  // update recipe view
  recipeView.update(model.state.recipe);
  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};


const controlAddRecipe = async (newRecipe) => {
  try {
    // show spinner
    addRecipeView.renderSpinner();

    // upload recipe && bookmark it
    await model.uploadRecipe(newRecipe);

    // render the new recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render bookmarks
    bookmarksView.render(model.state.bookmarks);

    // change ID to URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form
    setTimeout(() => {
      addRecipeView.toggleWindow();

    }, MODAL_CLOSE_SEC * 1000);

  } catch (error) {
    console.error('💥', error);
    addRecipeView.renderError(error.message);
  }
};



const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();


const clearBookmarks = () => localStorage.clear('bookmarks');
