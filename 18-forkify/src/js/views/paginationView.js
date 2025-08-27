'use strict';
import View from "./View";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');



    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

    _generateButtonMarkupNext(){
        return `<button data-goto="${this._data.currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    _generateButtonMarkupPrev(){
        return `
        <button data-goto="${this._data.currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
        </button>`;
    }

    _generateMarkup(){
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // page one and going forward
        if (this._data.currentPage === 1 && numPages > 1) {
            // only button to go to next page
            return `${this._generateButtonMarkupNext()}`;
        }
            //last page
            if (this._data.currentPage === numPages && numPages > 1) {
                // only button to go to previous page
                return `${this._generateButtonMarkupPrev()}`;
            }
            // other page
            if (this._data.currentPage < numPages) {
                return `${this._generateButtonMarkupPrev()}
                ${this._generateButtonMarkupNext()}`;
            }
            // page 1 and no other pages
            return ``;
    }
};



export default new PaginationView();