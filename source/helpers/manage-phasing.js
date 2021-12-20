// MANAGE PHASING
// -----------------------------------------------------------------------------

const CLASS_PHASING_IN = "is-phasing-in";
const CLASS_PHASING_OUT = "is-phasing-out";
const CLASS_SHOWN = "is-shown";

function managePhasing(...items) {
  items.forEach((item) => {
    const isShown = item.classList.contains(CLASS_SHOWN);
    const phasingClass = isShown ? CLASS_PHASING_OUT : CLASS_PHASING_IN;

    item.classList.add(phasingClass);

    item.addEventListener(
      "animationend",
      () => {
        item.classList.remove(phasingClass);
        item.classList.toggle(CLASS_SHOWN);
      },
      { once: true }
    );
  });
}

export default managePhasing;
