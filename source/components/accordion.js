// ACCORDION
// -----------------------------------------------------------------------------

import focusKeyable from "../helpers/focus-keyable";
import toggleCollapsible from "../helpers/toggle-collapsible";

const SELECTOR_ACCORDION = ".accordion";
const SELECTOR_SLAT = ".accordion-slat";

function Accordion(accordion) {
  const slats = Array.from(accordion.querySelectorAll(SELECTOR_SLAT));
  const navigationKeys = ["ArrowUp", "ArrowDown", "Home", "End"];

  function handleSlatClick(event) {
    const pressedSlat = event.target.closest(SELECTOR_SLAT);

    if (pressedSlat) {
      toggleCollapsible(pressedSlat);
    }
  }

  function handleSlatKeydown(event) {
    const pressedSlat = event.target.closest(SELECTOR_SLAT);

    if (pressedSlat && navigationKeys.includes(event.key)) {
      event.preventDefault();
      focusKeyable(event.key, slats);
    }
  }

  accordion.addEventListener("click", handleSlatClick);
  accordion.addEventListener("keydown", handleSlatKeydown);
}

Array.from(document.querySelectorAll(SELECTOR_ACCORDION)).forEach((accordion) => Accordion(accordion));
