(() => {
  window.menuWrap = document.querySelector(`.header__menu-wrap`);
  const body = document.body;
  const headerOverlay = document.querySelector(`.header__overlay`);
  window.btnBurger = document.querySelector(`.btn--burger`);
  const btnClose = document.querySelector(`.btn--menu-close`);
  window.headerTop = document.querySelector(`.header__top`);

  const onBtnBurgerMenuOpened = () => {
    menuOpened();
  };


  const menuOpened = () => {
    body.classList.add(`body--menu-opened`);
    window.menuWrap.classList.add(`header__menu-wrap--opened`);
    headerOverlay.classList.add(`header__overlay--show`);

    btnClose.addEventListener(`click`, onBtnClickMenuClosed);
    document.addEventListener(`keydown`, onEscMenuClosed);
  };

  const onBtnClickMenuClosed = () => {
    window.menuClosed();
    document.removeEventListener(`keydown`, window.onEscModalFormClose);

  };

  const onEscMenuClosed = (evt) => {
    if (evt.keyCode === 27) {

      if (window.modalSuccess.classList.contains(`modal--show`)) {
        window.onbtnSuccessClose();
        return;
      }

      if (!window.modalForm.classList.contains(`modal--show`) &&
        window.menuWrap.classList.contains(`header__menu-wrap--opened`)) {
        window.menuClosed();
      }

      if (window.modalForm.classList.contains(`modal--show`) &&
        window.menuWrap.classList.contains(`header__menu-wrap--opened`)) {
        window.modalForm.classList.remove(`modal--show`);
        document.removeEventListener(`keydown`, window.onEscModalFormClose);
      }


    }
  };






  window.menuClosed = () => {
    body.classList.remove(`body--menu-opened`);
    window.menuWrap.classList.remove(`header__menu-wrap--opened`);
    headerOverlay.classList.remove(`header__overlay--show`);

    btnClose.removeEventListener(`click`, onBtnClickMenuClosed);
    document.removeEventListener(`keydown`, onEscMenuClosed);
  };

  // отслеживает размер окна

  let mql = window.matchMedia(`screen and (min-width: 1023px)`);

  const setupForWidth = (media) => {
    if (media.matches && headerOverlay.classList.contains(`header__overlay--show`)) {
      headerOverlay.classList.remove(`header__overlay--show`);
      body.classList.remove(`body--menu-opened`)
    }

    if (media.matches && window.menuWrap.classList.contains(`header__menu-wrap--opened`)) {
      window.menuWrap.classList.remove(`header__menu-wrap--opened`);
    }

    if (media.matches && headerOverlay.classList.contains(`header__overlay--show`)) {
      window.headerTop.style.display = `none`;
    }
  };

  mql.addListener(setupForWidth); // Добавим прослушку на смену результата

  setupForWidth(mql); // Вызовем нашу функцию


  window.btnBurger.addEventListener(`click`, onBtnBurgerMenuOpened);


})();
