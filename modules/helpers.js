import { books } from "./data.js";
import { assignCurrentFilters } from "./createPreview.js";
import { handleClickAversion } from "./clickAversion.js";
/**
 * Check to see if filters are set to the default values.
 * @param {object} filters
 * @returns {boolean}
 */
export const isAny = (filters) => {
  const genreAny = filters.genre === "any";
  const authorAny = filters.author === "any";
  const titleEmpty = filters.title === "";
  if (genreAny && authorAny && titleEmpty) {
    return true;
  } else {
    return false;
  }
};

/**
 *  Check to see if genre is set to it's default value in the filters object given
 * @param {object} filters
 * @returns {boolean}
 */
export const isGenreAny = (filters) => {
  const genreAny = filters.genre === "any";
  if (genreAny) {
    return true;
  } else {
    return false;
  }
};

/**
 * Looks at the filters provided and returns the necessary books in the form of an array
 * @returns {Array}
 */
export const assignExtractedBooks = () => {
  let filters = {
    title: "",
    genre: "any",
    author: "any",
  };
  let extractedBooks = [];
  const formData = new FormData(document.querySelector("[data-search-form]"));
  filters = Object.fromEntries(formData);
  const areFiltersAny = isAny(filters);
  assignCurrentFilters(filters);

  if (areFiltersAny) {
    extractedBooks = books;
  } else {
    for (let i = 0; i < books.length; i++) {
      const trimTitle = filters.title.trim().toLowerCase();
      const lowerCaseBookTitle = books[i].title.toLowerCase();
      const titleMatch = lowerCaseBookTitle.includes(trimTitle) ? true : false;
      const authorMatch =
        filters.author === "any" || books[i].author === filters.author;
      let genreMatch = "";
      const genreAny = isGenreAny(filters);

      for (let j = 0; j < books[i].genres.length; j++) {
        if (books[i].genres[j] === filters.genre) {
          genreMatch = true;
          break;
        } else {
          genreMatch = false;
        }
      }

      if (titleMatch && authorMatch && (genreMatch || genreAny)) {
        extractedBooks.push(books[i]);
      }
      const dataMessage = document.querySelector("[data-list-message]");
      if (extractedBooks.length < 1) {
        dataMessage.classList.add("list__message_show");
      } else {
        dataMessage.classList.remove("list__message_show");
      }
    }
  }

  return extractedBooks;
};

/**
 * Sets the necessary attributes to an element by taking values from a book
 * @param {HTMLElement} element
 * @param {object} book
 */
export const setAttributes = (element, book) => {
  element.setAttribute("data-preview-id", book.id);
  element.setAttribute("data-preview-img", book.image);
  element.setAttribute("data-preview-title", book.title);
  element.setAttribute("data-preview-author", book.author);
  element.setAttribute("data-preview-description", book.description);
  element.setAttribute("data-preview-published", book.published);
};

/**
 *
 * @param {HTMLElement} element
 * @param {object} book
 */
export const generateHtml = (element, book) => {
  element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${book.image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${book.title}</h3>
                <div class="preview__author">${book.author}</div>
            </div>
        `;
};

/**
 *
 * @param {HTMLElement} element
 * @returns {HTMLElement}
 */
export const addEventListenersToALL = (element) => {
  const newTitle = element.querySelector(".preview__title");
  const newImg = element.querySelector(".preview__image");
  const newAuthor = element.querySelector(".preview__author");

  newImg.addEventListener("click", handleClickAversion);
  newTitle.addEventListener("click", handleClickAversion);
  newAuthor.addEventListener("click", handleClickAversion);

  return element;
};
