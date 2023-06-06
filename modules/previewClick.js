/**
 * Event handler for when one of the Preview divs are clicked. On fire, this
 * event will take the dataset from the nearest HTML element with the class 'preview'
 * and assign it to variables
 */

const createOverlay = (overlay, book) => {
  overlay.title.innerHTML = `${book.title} (${book.published})`;
  overlay.author.innerHTML = book.author;
  overlay.img.setAttribute("src", book.imageLink);
  overlay.description.innerHTML = book.description;
};
/**
 * Gets the data of the items provided.
 * @param {Array} array - Takes an array
 */
export const handlePreviewClick = (event) => {
  event.preventDefault();
  const overlayEl = document.querySelector("[data-list-active]");
  const target = event.target.closest(".preview");
  const targetData = target.dataset;
  const date = new Date(targetData.previewPublished);
  const book = {
    title: targetData.previewTitle,
    author: targetData.previewAuthor,
    description: targetData.previewDescription,
    imageLink: targetData.previewImg,
    published: date.getFullYear(),
  };

  const overlay = {
    title: document.querySelector("[data-list-title]"),
    img: document.querySelector("[data-list-image]"),
    author: document.querySelector("[data-list-subtitle]"),
    description: document.querySelector("[data-list-description]"),
  };
  createOverlay(overlay, book);
  overlayEl.toggleAttribute("open");
};
