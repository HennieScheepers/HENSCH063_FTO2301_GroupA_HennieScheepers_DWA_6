/**
 * @param {Boolean} timeOfDay
 * @param {object} day
 * @param {object} night
 */
const checkTheme = (timeOfDay, day, night) => {
  if (timeOfDay) {
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

  checkTheme(isDay, day, night);
};
