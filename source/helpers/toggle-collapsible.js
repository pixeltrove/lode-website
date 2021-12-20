// TOGGLE COLLAPSIBLE
// -----------------------------------------------------------------------------

const CLASS_ACTIVATED = "is-activated";
const CLASS_PHASING = "is-phasing";
const CLASS_SHOWN = "is-shown";
const DATA_TOGGLE = "data-toggle";

function toggleCollapsible(trigger) {
  const collapsibleId = trigger.getAttribute(DATA_TOGGLE);
  const collapsible = document.querySelector(`#${collapsibleId}`);
  const isPhasing = collapsible.classList.contains(CLASS_PHASING);
  const isShown = collapsible.classList.contains(CLASS_SHOWN);

  if (!isPhasing) {
    trigger.classList.toggle(CLASS_ACTIVATED);
    trigger.setAttribute("aria-expanded", isShown ? "false" : "true");
    collapsible.classList.add(CLASS_PHASING);
    collapsible.style.overflowY = "hidden";

    requestAnimationFrame(() => {
      collapsible.style.height = isShown ? collapsible.scrollHeight + "px" : 0;

      requestAnimationFrame(() => {
        collapsible.style.height = isShown ? 0 : collapsible.scrollHeight + "px";
      });
    });

    collapsible.addEventListener(
      "transitionend",
      () => {
        collapsible.classList.remove(CLASS_PHASING);
        collapsible.classList.toggle(CLASS_SHOWN);
        collapsible.style.overflowY = "";
        collapsible.style.height = isShown ? 0 : "auto";
      },
      { once: true }
    );
  }
}

export default toggleCollapsible;
