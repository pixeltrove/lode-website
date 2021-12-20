// TOGGLE SCROLL
// -----------------------------------------------------------------------------

function toggleScroll() {
  const isScrollable = window.innerHeight < document.documentElement.scrollHeight;
  const scrollPosition = window.scrollY || Math.abs(parseInt(document.body.style.top));

  document.body.style.position = isScrollable ? "fixed" : "";
  document.body.style.top = isScrollable ? -scrollPosition + "px" : "";
  document.body.style.overflowY = isScrollable ? "scroll" : "";

  window.scroll(0, scrollPosition);
}

export default toggleScroll;
