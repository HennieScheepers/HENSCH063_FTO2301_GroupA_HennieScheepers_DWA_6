import { authors, genres } from "./data.js";
import { books, BOOKS_PER_PAGE } from "./data.js";
import { handlePreviewClick } from "./previewClick.js";
import { handleClickAversion } from "./clickAversion.js";
import { searchButton } from "./scripts.js";
import {
  setAttributes,
  assignExtractedBooks,
  generateHtml,
  addEventListenersToALL,
} from "./helpers.js";

/**
 * Global variables used to detect changes in genre, title, author
 * @type {String}
 */
let CURRENTGENRE = "none";

/**
 * @type {String}
 */
let CURRENTAUTHOR = "none";
/**
 * @type {String}
 */
let CURRENTTITLE = "none";

/**
 * Counter to keep track of the number of PAGES to be displayed.
 * This is used in later event handler to dictate how many books need to be displayed
 */
export let PAGES = 1;

/**
 * Checks the current values for author, genre, title against the user given inputs.
 * Returns true if they match.
 * @param {object} filters
 * @returns {boolean}
 */
const checkCurrentFilters = (filters) => {
  const isCurrentAuhtor = CURRENTAUTHOR === filters.author;
  const isCurrentGenre = CURRENTGENRE === filters.genre;
  const isCurrentTitle = CURRENTTITLE === filters.title;
  if (isCurrentAuhtor && isCurrentGenre && isCurrentTitle) {
    return true;
  } else {
    return false;
  }
};

/**
 * Assigns the filter given's values to the current values for author, title, and genre
 * @param {Object} filters
 */
export const assignCurrentFilters = (filters) => {
  const areCurrentFilters = checkCurrentFilters(filters);

  if (!areCurrentFilters) {
    CURRENTAUTHOR = filters.author;
    CURRENTGENRE = filters.genre;
    CURRENTTITLE = filters.title;
    PAGES = 1;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

/**
 *
 * @param {Number} remaining
 */
const calculateRemaining = (remaining) => {
  const dataListButton = document.querySelector("[data-list-button]");
  if (remaining > 0) {
    dataListButton.innerHTML = /* html */ `
              <span>Show more</span>
              <span class="list__remaining"> (${remaining})</span>
          `;
    dataListButton.removeAttribute("disabled");
  } else {
    dataListButton.setAttribute("disabled", true);
  }
};

/**
 * Takes an array of books and generates the books to be displayed per page
 * @param {array} extractedBooks
 */
const generateBooks = (extractedBooks) => {
  const button = document.querySelector("[data-list-button]");
  const listItem = document.querySelector("[data-list-items]");
  const fragment = document.createDocumentFragment();
  let remaining = 0;

  listItem.innerHTML = "";

  for (let i = 0; i < BOOKS_PER_PAGE * PAGES; i++) {
    let authorId;
    if (extractedBooks[i] === undefined) {
      button.innerHTML = "Show More 0";
      break;
    } else {
      authorId = extractedBooks[i].author;
    }

    const book = {
      author: authors[authorId],
      authorID: authorId,
      id: extractedBooks[i].id,
      image: extractedBooks[i].image,
      title: extractedBooks[i].title,
      description: extractedBooks[i].description,
      published: extractedBooks[i].published,
    };
    const element = document.createElement("div");

    element.addEventListener("click", handlePreviewClick);
    element.classList = "preview";
    setAttributes(element, book);
    generateHtml(element, book);

    fragment.appendChild(addEventListenersToALL(element));
    remaining = extractedBooks.length - BOOKS_PER_PAGE * PAGES;
  }

  const dataList = document.querySelector("[data-list-items]");

  dataList.appendChild(fragment);

  calculateRemaining(remaining);
};

/**
 * Event handler used to create the previews. It is called on startup to create the
 * previews and also called when a filter is applied to the list of books and the search
 * button is clicked.
 */
export const createPreviews = (event) => {
  event.preventDefault();
  const extractedBooks = assignExtractedBooks();
  generateBooks(extractedBooks);

  const searchOverlayCancelButton = document.querySelector(
    "[data-search-cancel]"
  );
  searchOverlayCancelButton.click();
};

/**
 * This is the event handler for the button with the attribute 'data-list-button'.
 * This is also known as the 'Show More' button. Main function of this event handler
 * is to increment PAGES to tell createPreviews how many PAGES of preview divs
 * to display
 */
export const handleShowMoreClick = () => {
  PAGES++;
  searchButton.click();

  const searchOverlayCancelButton = document.querySelector(
    "[data-search-cancel]"
  );
  searchOverlayCancelButton.click();
};
