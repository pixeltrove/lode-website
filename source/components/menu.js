// MENU
// -----------------------------------------------------------------------------

import focusKeyable from "../helpers/focus-keyable";
import managePhasing from "../helpers/manage-phasing";

const SELECTOR_MENU = ".menu";
const SELECTOR_LINK = ".menu-link";
const CLASS_ACTIVATED = "is-activated";
const CLASS_PHASING_IN = "is-phasing-in";
const CLASS_PHASING_OUT = "is-phasing-out";
const CLASS_SHOWN = "is-shown";
const DATA_TOGGLE = "data-toggle";

function Menu(menu) {
  const menuId = menu.id;
  const trigger = document.querySelector(`[${DATA_TOGGLE}="${menuId}"]`);
  const links = Array.from(menu.querySelectorAll(SELECTOR_LINK));
  const navigationKeys = ["ArrowUp", "ArrowDown", "Home", "End"];
  const focusableElements = Array.from(menu.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])"));
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  function toggle() {
    const isPhasing = menu.classList.contains(CLASS_PHASING_IN) || menu.classList.contains(CLASS_PHASING_OUT);
    const isShown = menu.classList.contains(CLASS_SHOWN);

    if (!isPhasing) {
      isShown ? hide() : show();
    }
  }

  function show() {
    trigger.classList.add(CLASS_ACTIVATED);
    trigger.setAttribute("aria-expanded", true);
    managePhasing(menu);

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKeydown);
    trigger.addEventListener("keydown", handleTabKeydown);
    menu.addEventListener("keydown", handleTabKeydown);
    menu.addEventListener("keydown", handleLinkKeydown);
  }

  function hide() {
    trigger.classList.remove(CLASS_ACTIVATED);
    trigger.setAttribute("aria-expanded", false);
    managePhasing(menu);

    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("keydown", handleEscapeKeydown);
    trigger.removeEventListener("keydown", handleTabKeydown);
    menu.removeEventListener("keydown", handleTabKeydown);
    menu.removeEventListener("keydown", handleLinkKeydown);
  }

  function handleOutsideClick(event) {
    if (!trigger.contains(event.target) && !menu.contains(event.target)) {
      hide();
    }
  }

  function handleEscapeKeydown(event) {
    if (event.key === "Escape") {
      hide();
    }
  }

  function handleTabKeydown(event) {
    if ((event.key === "Tab" && !event.shiftKey && document.activeElement === lastFocusableElement) || (event.key === "Tab" && event.shiftKey && document.activeElement === trigger)) {
      hide();
    }
  }

  function handleLinkKeydown(event) {
    const pressedLink = event.target.closest(SELECTOR_LINK);

    if (pressedLink && navigationKeys.includes(event.key)) {
      event.preventDefault();
      focusKeyable(event.key, links);
    }
  }

  trigger.addEventListener("click", toggle);
}

Array.from(document.querySelectorAll(SELECTOR_MENU)).forEach((menu) => Menu(menu));
