/**
 * Event handler for when the user clicks the settings button at the top of the
 * header. This even
 *
 */
export const handleSettingsOverlayToggle = () => {
  const settingsOverlay = document.querySelector("[data-settings-overlay]");
  settingsOverlay.toggleAttribute("open");
};
