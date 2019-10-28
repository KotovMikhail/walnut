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
