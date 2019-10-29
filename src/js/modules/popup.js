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
