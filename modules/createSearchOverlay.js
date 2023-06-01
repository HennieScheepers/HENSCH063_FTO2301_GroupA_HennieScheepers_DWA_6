import { authors, genres } from "./data.js";
/**
 * Event handler for the header search button. When clicked it will open the search
 * overlay and allow the user to input data that they would like the books to
 * be filtered by. This event handler is also used to create the options in both
 * the author and genre selectors
 */
export const createSearchOverlay = () => {
  const searchOverlay = document.querySelector("[data-search-overlay]");
  const title = document.querySelector("[data-search-title]");
  const genreSelector = document.querySelector("[data-search-genres]");
  const authorSelector = document.querySelector("[data-search-authors]");
  const option = document.createElement("option");
  const optionGenres = document.createElement("option");

  searchOverlay.toggleAttribute("open");
  title.focus();
  option.setAttribute("value", "any");
  option.innerHTML = "All Authors";
  authorSelector.appendChild(option);
  optionGenres.setAttribute("value", "any");
  optionGenres.innerHTML = "All Genres";
  genreSelector.appendChild(optionGenres);

  for (const i in authors) {
    const author = {
      authorName: authors[i],
      authorId: i,
    };
    const option = document.createElement("option");
    option.setAttribute("value", author.authorId);
    option.innerHTML = author.authorName;
    authorSelector.appendChild(option);
  }

  for (const i in genres) {
    const genre = {
      genreName: genres[i],
      genreId: i,
    };
    const option = document.createElement("option");
    option.setAttribute("value", genre.genreId);
    option.innerHTML = genre.genreName;
    genreSelector.appendChild(option);
  }
};
