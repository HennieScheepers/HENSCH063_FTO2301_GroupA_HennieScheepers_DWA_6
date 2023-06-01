/**
 * Take the elements in the preview divs and averts their click events
 * towards the div click event in order to fire the handlePreviewClick event
 * @param {Event} event - Click event
 */
export const handleClickAversion = (event) => {
  const newPreview = event.target.closest(".preview");
  newPreview.event;
};
