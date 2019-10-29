

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

let phone1 = document.getElementById(`phone`);
let phone2 = document.getElementById(`phone2`);

let im = new Inputmask(`+7 ( 999 ) 999 - 99 - 99`);
im.mask(phone1);

let im2 = new Inputmask(`+7 ( 999 ) 999 - 99 - 99`);
im2.mask(phone2);

(() => {

  window.modalForm = document.querySelector(`.modal--form`);
  window.modalSuccess = document.querySelector(`.modal--success`);
  const btnCallBack = document.querySelector(`.header__callback`);
  const btnCallBackClose = window.modalForm.querySelector(`.btn--form-close`);

  window.modalFormClose = () => {
    window.modalForm.classList.remove(`modal--show`);
  };

  const onBtnCallBackMenuClose = () => {
    window.modalFormClose();
    document.removeEventListener(`keydown`, window.onEscModalFormClose);
  };

  window.onEscModalFormClose = (evt) => {
    if (window.modalForm) {
      if (evt.keyCode === 27) {
        window.modalForm.classList.remove(`modal--show`);
        document.removeEventListener(`keydown`, window.onEscModalFormClose);

      }
    }
  };

  btnCallBack.addEventListener(`click`, function () {
    window.modalForm.classList.add(`modal--show`);

    let form = window.modalForm.querySelector(`.modal__form`);

    window.formValidate(form)
    btnCallBackClose.addEventListener(`click`, onBtnCallBackMenuClose);

    document.addEventListener(`keydown`, window.onEscModalFormClose);

  });


})();

(() => {
  const modalSuccess = window.modalSuccess;
  const btnSuccessClose = document.querySelector(`.btn--success-close`);

  window.onbtnSuccessClose = () => {
    modalSuccess.classList.remove(`modal--show`);
  };

  window.modalSuccessShow = () => {
    modalSuccess.classList.add(`modal--show`);
    btnSuccessClose.addEventListener(`click`, window.onbtnSuccessClose);

    if (window.modalForm.classList.contains(`modal--show`)) {
      window.modalFormClose();
      document.removeEventListener(`keydown`, window.onEscModalFormClose);

    }

  };

  if (!window.menuWrap.classList.contains(`header__menu-wrap--opened`)) {
    window.form = document.querySelector(`.header__form`);
  }

  window.formValidate = (form) => {

    const onFormSent = () => {
      window.modalSuccessShow();
    };

    form.addEventListener(`invalid`, (evt) => {
      evt.preventDefault();

      let input = evt.target;
      input.classList.add(`modal--error`);
      form.querySelectorAll(`.form :invalid`)[0].focus();
    }, true);

    form.addEventListener(`change`, function (evt) {
      let input = evt.target;

      if (input.validity.valid) {
        input.classList.remove(`modal--error`);
      }
    }, true);

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      onFormSent(onFormSent);
    });
  };

  window.formValidate(window.form);

})();
