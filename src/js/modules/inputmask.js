let phone1 = document.getElementById(`phone`);
let phone2 = document.getElementById(`phone2`);

let im = new Inputmask(`+7 ( 999 ) 999 - 99 - 99`);
im.mask(phone1);

let im2 = new Inputmask(`+7 ( 999 ) 999 - 99 - 99`);
im2.mask(phone2);
