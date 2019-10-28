(function () {

  const headerContent = document.querySelector(`.header__content`);
  window.headerTop = document.querySelector(`.header__top`);
  const btnBurgerComputedStyle = getComputedStyle(window.btnBurger).display;

  document.addEventListener(`scroll`, function () {
    if (pageYOffset > 1) {

      headerContent.classList.add(`header-sticky`);

      if (btnBurgerComputedStyle === `none`) {
        window.headerTop.style.display = `none`;
      }

      if (btnBurgerComputedStyle === `block`) {
        window.headerTop.style.display = `flex`;
      }
    } else {
      window.headerTop.style.display = `flex`;
      headerContent.classList.remove(`header-sticky`);
    }
  });

})();
