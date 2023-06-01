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
