(() => {

  window.headerContent = document.querySelector(`.header__content`);

  const header = document.querySelector(`.header`);

  document.addEventListener(`scroll`, function () {
    const btnBurgerComputedStyle = getComputedStyle(window.btnBurger).display;

    if (pageYOffset > 10) {
      window.headerContent.classList.add(`header-sticky`);


      if (btnBurgerComputedStyle === `none`) {
        window.headerTop.style.display = `none`;
        header.style.paddingTop = `208px`;
      }

      if (btnBurgerComputedStyle === `block`) {
        header.style.paddingTop = `83px`;
      }

      if (btnBurgerComputedStyle === `block`) {
        window.headerTop.style.display = `flex`;
      }
    } else {
      header.style.paddingTop = `0`;
      window.headerTop.style.display = `flex`;
      window.headerContent.classList.remove(`header-sticky`);
    }
  });

})();
