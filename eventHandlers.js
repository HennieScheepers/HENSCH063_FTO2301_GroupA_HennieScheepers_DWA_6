import { authors, genres } from "./data.js";
import { books, BOOKS_PER_PAGE } from "./data.js";
import { searchButton } from "./scripts.js";
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
 * Event handler for when one of the Preview divs are clicked. On fire, this
 * event will take the dataset from the nearest HTML element with the class 'preview'
 * and assign it to variables
 */
export const handlePreviewClick = (event) => {
  event.preventDefault();
  const overlay = document.querySelector("[data-list-active]");
  overlay.toggleAttribute("open");
  const target = event.target.closest(".preview");
  const targetData = target.dataset;
  const bookTitle = targetData.previewTitle;
  const bookAuthor = targetData.previewAuthor;
  const bookDescription = targetData.previewDescription;
  const bookImageLink = targetData.previewImg;
  const date = new Date(targetData.previewPublished);
  const bookPublished = date.getFullYear();
  const overlayTitle = document.querySelector("[data-list-title]");
  const overlayImg = document.querySelector("[data-list-image]");
  const overlayAuthor = document.querySelector("[data-list-subtitle]");
  const overlayDescription = document.querySelector("[data-list-description]");

  overlayTitle.innerHTML = `${bookTitle} (${bookPublished})`;
  overlayAuthor.innerHTML = bookAuthor;
  overlayImg.setAttribute("src", bookImageLink);
  overlayDescription.innerHTML = bookDescription;
};

/**
 * The purpose of this even handler is to toggle the Preview overlay
 * (with attribute 'data-list-active) when the 'close' button on the preview
 * is clicked
 */
export const handlePreviewToggle = () => {
  // Variable to store the HTML element with the attribute 'data-list-active'
  const overlay = document.querySelector("[data-list-active]");
  overlay.toggleAttribute("open");
};

/**
 * Take the elements in the preview divs and averts their click events
 * towards the div click event in order to fire the handlePreviewClick event
 * @param {Event} event - Click event
 */
export const handleClickAversion = (event) => {
  const newPreview = event.target.closest(".preview");
  newPreview.event;
};

/**
 * Event handler for when the user clicks the settings button at the top of the
 * header. This even
 *
 */
export const handleSettingsOverlayToggle = () => {
  const settingsOverlay = document.querySelector("[data-settings-overlay]");
  settingsOverlay.toggleAttribute("open");
};

/**
 * Event handler for when the user changes the theme of the site. It is fired by
 * clicking the save button on the settings overlay
 */
export const handleSettingsSave = (event) => {
  /**
   * Holds the color values for the day theme
   * @type {Object}
   */
  const day = {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  };

  /**
   * Holds the color values for the night theme
   * @type {Object}
   */
  const night = {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  };
  event.preventDefault();
  const form = document.querySelector("[data-settings-form]");
  const formData = new FormData(form);
  const result = Object.fromEntries(formData);
  const isDay = result.theme === "day";

  if (isDay) {
    document.documentElement.style.setProperty("--color-light", day.light);
    document.documentElement.style.setProperty("--color-dark", day.dark);
  } else {
    document.documentElement.style.setProperty("--color-dark", night.dark);
    document.documentElement.style.setProperty("--color-light", night.light);
  }
  const overlay = document.querySelector("[data-settings-overlay]");
  overlay.toggleAttribute("open");
};

/**
 * Event handler for the header search button. When clicked it will open the search
 * overlay and allow the user to input data that they would like the books to
 * be filtered by. This event handler is also used to create the options in both
 * the author and genre selectors
 */
export const createSearchOverlay = () => {
  const searchOverlay = document.querySelector("[data-search-overlay]");
  searchOverlay.toggleAttribute("open");
  const title = document.querySelector("[data-search-title]");
  title.focus();
  const genreSelector = document.querySelector("[data-search-genres]");
  const authorSelector = document.querySelector("[data-search-authors]");

  const option = document.createElement("option");
  option.setAttribute("value", "any");
  option.innerHTML = "All Authors";
  authorSelector.appendChild(option);

  const optionGenres = document.createElement("option");
  optionGenres.setAttribute("value", "any");
  optionGenres.innerHTML = "All Genres";
  genreSelector.appendChild(optionGenres);

  for (const i in authors) {
    const authorName = authors[i];
    const authorId = i;
    const option = document.createElement("option");
    option.setAttribute("value", authorId);
    option.innerHTML = authorName;
    authorSelector.appendChild(option);
  }

  for (const i in genres) {
    const genreName = genres[i];
    const genreId = i;
    const option = document.createElement("option");
    option.setAttribute("value", genreId);
    option.innerHTML = genreName;
    genreSelector.appendChild(option);
  }
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

/**
 * Event handler used to create the previews. It is called on startup to create the
 * previews and also called when a filter is applied to the list of books and the search
 * button is clicked.
 */
export const createPreviews = (event) => {
  event.preventDefault();
  let filters = {
    title: "",
    genre: "any",
    author: "any",
  };

  const formData = new FormData(document.querySelector("[data-search-form]"));

  filters = Object.fromEntries(formData);

  const isCurrentAuhtor = CURRENTAUTHOR === filters.author;
  const isCurrentGenre = CURRENTGENRE === filters.genre;
  const isCurrentTitle = CURRENTTITLE === filters.title;
  const genreAny = filters.genre === "any";
  const authorAny = filters.author === "any";
  const titleEmpty = filters.title === "";
  let extractedBooks = [];

  if (!isCurrentAuhtor || !isCurrentGenre || !isCurrentTitle) {
    CURRENTAUTHOR = filters.author;
    CURRENTGENRE = filters.genre;
    CURRENTTITLE = filters.title;
    PAGES = 1;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Conditional to check whether extractedBooks should be assigned with books as is
  // or should it be worked through with a specified title/genre/author
  if (genreAny && authorAny && titleEmpty) {
    extractedBooks = books;
  } else {
    for (let i = 0; i < books.length; i++) {
      const trimTitle = filters.title.trim().toLowerCase();
      const lowerCaseBookTitle = books[i].title.toLowerCase();
      const titleMatch = lowerCaseBookTitle.includes(trimTitle) ? true : false;
      const authorMatch =
        filters.author === "any" || books[i].author === filters.author;
      let genreMatch = "";

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
    element.setAttribute("data-preview-id", book.id);
    element.setAttribute("data-preview-img", book.image);
    element.setAttribute("data-preview-title", book.title);
    element.setAttribute("data-preview-author", book.author);
    element.setAttribute("data-preview-description", book.description);
    element.setAttribute("data-preview-published", book.published);

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

    const newTitle = element.querySelector(".preview__title");
    const newImg = element.querySelector(".preview__image");
    const newAuthor = element.querySelector(".preview__author");

    newImg.addEventListener("click", handleClickAversion);
    newTitle.addEventListener("click", handleClickAversion);
    newAuthor.addEventListener("click", handleClickAversion);

    fragment.appendChild(element);
    remaining = extractedBooks.length - BOOKS_PER_PAGE * PAGES;
  }

  const dataList = document.querySelector("[data-list-items]");
  const dataListButton = document.querySelector("[data-list-button]");

  dataList.appendChild(fragment);

  if (remaining > 0) {
    dataListButton.innerHTML = /* html */ `
              <span>Show more</span>
              <span class="list__remaining"> (${remaining})</span>
          `;
    dataListButton.removeAttribute("disabled");
  } else {
    dataListButton.setAttribute("disabled", true);
  }

  const searchOverlayCancelButton = document.querySelector(
    "[data-search-cancel]"
  );
  searchOverlayCancelButton.click();
};
