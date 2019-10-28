

(() => {
  window.menuWrap = document.querySelector(`.header__menu-wrap`);
  const body = document.body;
  const headerOverlay = document.querySelector(`.header__overlay`);
  window.btnBurger = document.querySelector(`.btn--burger`);
  const btnClose = document.querySelector(`.btn--menu-close`);

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
    }


    if (media.matches && window.menuWrap.classList.contains(`header__menu-wrap--opened`)) {
      window.menuWrap.classList.remove(`header__menu-wrap--opened`);
    }
  };

  mql.addListener(setupForWidth); // Добавим прослушку на смену результата

  setupForWidth(mql); // Вызовем нашу функцию


  window.btnBurger.addEventListener(`click`, onBtnBurgerMenuOpened);


})();

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

// (() => {
//   const modalSuccess = window.modalSuccess;
//   const btnSuccessClose = document.querySelector(`.btn--success-close`);

//   const onbtnSuccessClose = () => {
//     modalSuccess.classList.remove(`modal--show`);
//   };

//   window.modalSuccessShow = () => {
//     modalSuccess.classList.add(`modal--show`);
//     btnSuccessClose.addEventListener(`click`, onbtnSuccessClose);

//   };

//   if (!window.menuWrap.classList.contains(`header__menu-wrap--opened`)) {
//     window.form = document.querySelector(`.header__form`);
//   }

//   window.formValidate = (form) => {

//     const sendFormData = (onload, data) => {
//       let xhr = new XMLHttpRequest();
//       xhr.responseType = `json`;

//       xhr.addEventListener(`load`, () => {
//         if (xhr.status === 200) {
//           onload(xhr.response);
//         }
//       });

//       xhr.open(`POST`, form.action);
//       xhr.setRequestHeader(`x-requested-with`, `XMLHttpRequest`);

//       xhr.send(data);
//     };

//     const onFormSent = (data) => {
//       if (data.success) {

//         window.modalSuccessShow();

//       } else {
//         let formFields = form.querySelectorAll(`.form__input`);
//         for (let field of formFields) {
//           let input = field.querySelector(`input`);

//           if (data.data[input.name]) {
//             field.classList.add(`modal--error`);

//           }
//         }
//       }
//     };



//     form.addEventListener(`invalid`, (evt) => {
//       evt.preventDefault();

//       let input = evt.target;
//       input.classList.add(`modal--error`);
//       form.querySelectorAll(`.form :invalid`)[0].focus();
//     }, true);

//     form.addEventListener(`change`, function (evt) {
//       let input = evt.target;

//       if (input.validity.valid) {
//         input.classList.remove(`modal--error`);
//       }
//     }, true);

//     form.addEventListener(`submit`, (evt) => {
//       evt.preventDefault();
//       let formData = new FormData(form);
//       sendFormData(onFormSent, formData);
//     });
//   }

//   window.formValidate(window.form);

// })();

let phone1 = document.getElementById(`phone`);
let phone2 = document.getElementById(`phone2`);

let im = new Inputmask(`+7 (999)-999-99-99`);
im.mask(phone1);

let im2 = new Inputmask(`+7 (999)-999-99-99`);
im2.mask(phone2);

(function () {

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
