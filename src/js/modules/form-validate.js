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
