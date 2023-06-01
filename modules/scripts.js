import { books } from "./data.js";
import { createPreviews } from "./createPreview.js";
import { handlePreviewToggle } from "./previewToggle.js";
import { handleShowMoreClick } from "./createPreview.js";
import { createSearchOverlay } from "./createSearchOverlay.js";
import { handleSettingsOverlayToggle } from "./settingsToggle.js";
import { handleSettingsSave } from "./saveSettings.js";

/**
 * Holds the length of books (imported form data.js).
 * Books serves as the data for this website
 * @type {number}
 */
const RANGE = books.length;
// If books is not an array or if it's length is 1 throw errors
if (!books && !Array.isArray(books)) throw new Error("Source required");
if (!RANGE && RANGE < 2)
  throw new Error("Range must be an array with two numbers");

const showMoreButton = document.querySelector("[data-list-button]");
export const searchButton = document.querySelector(
  "body > dialog:nth-child(4) > div > div > button.overlay__button.overlay__button_primary"
);
const listCloseButton = document.querySelector("[data-list-close]");
const settingsSaveButton = document.querySelector(
  "body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary"
);
const settingsCancelButton = document.querySelector("[data-settings-cancel]");
const settingsOverlayButton = document.querySelector("[data-header-settings]");
const searchOverlayCancelButton = document.querySelector(
  "[data-search-cancel]"
);
const headerSearch = document.querySelector("[data-header-search]");

showMoreButton.addEventListener("click", handleShowMoreClick);
searchButton.addEventListener("click", createPreviews);
listCloseButton.addEventListener("click", handlePreviewToggle);
settingsSaveButton.addEventListener("click", handleSettingsSave);
settingsCancelButton.addEventListener("click", handleSettingsOverlayToggle);
settingsOverlayButton.addEventListener("click", handleSettingsOverlayToggle);
searchOverlayCancelButton.addEventListener("click", createSearchOverlay);
headerSearch.addEventListener("click", createSearchOverlay);

headerSearch.click();
searchButton.click();
