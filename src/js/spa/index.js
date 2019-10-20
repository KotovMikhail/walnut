// window.addEventListener('load', function () {
//   window.imgSrc = document.querySelector(`.gallery__img`);
//   window.currentImg = document.querySelector(`.gallery__img--big`);


//   if (window.imgSrc) {
//     localStorage.setItem('test', window.imgSrc.src)
//   }

//   if (window.currentImg) {
//     console.log(localStorage.getItem('test'))
//     window.currentImg.src = localStorage.getItem('test')
//   }
// })



// // let field2;

// // localStorage.setItem('test', window.imgSrc.src);

// // field2 = document.getElementById(`field2`);
// // field2.value = localStorage.getItem('test');

// // console.log(localStorage)


// sayHello.bind(person1)();
// sayHello.bind(person2)();

// function sayHello() {
//   console.log(`Всем привет! Меня зовут ${this.name} ${this.family}`)
// }


// const person1 = {
//   name: `Алексей`,
//   family: `Дачин`,
//   age: 26,

//   sayHello() {
//     console.log(`Привет! Я ${this.name} ${this.family}. Мне ${this.age} `);
//   },

//   goToHome() {
//     console.log(`Всем пока я пошёл домой!`);
//   }
// };

// const person2 = {
//   name: `Юрий`,
//   family: `Ключевский`,
//   age: 30,

//   sayHello() {
//     console.log(`Привет! Я ${this.name} ${this.family}. Мне ${this.age} `);
//   },

//   goToHome() {
//     console.log(`Всем пока я пошёл домой!`);
//   }

// };

// person1.sayHello();
// person2.sayHello();

// function getPerson(name, family, age) {
//   const person = {
//     name: name,
//     family: family,
//     age: age,

//     sayHello() {
//       console.log(`Ну здрасти... Меня ${this.name} ${this.family}. Мне ${this.age}`);
//     }
//   };

//   return person;
// }


// const person1 = getPerson(`Алексей`, `Данчин`, 36)
// const person2 = getPerson(`Юрий`, `Ключевски`, 36)

// person2.sayHello()


// function Person(name, family, age) {
//   this.name = name;
//   this.family = family;
//   this.age = age;

//   Person.count += 1;
// }

// Person.count = 0;

// Person.prototype.sayHello = function () {
//   console.log(`Всем привет! Меня зовут ${this.name} ${this.family}`);
// };

// const person1 = new Person(`Алексей`, `Данчин`, 36);
// const person2 = new Person(`Юрий`, `Ключевски`, 36);

// person1.sayHello();
// person2.sayHello();

// class Person {
//   constructor(name, family, age) {
//     this.name = name;
//     this.family = family;
//     this.age = age;

//     Person.count += 1;
//   }

//   sayHello() {
//     console.log(`Меня зовут ${this.name} ${this.family}. Мне ${this.age} лет`);
//     Person.count
//   }

//   get fullName() {
//     return `${this.name} ${this.family}`;
//   }

//   set fullName(val) {
//     const match = val.split(' ');

//     this.name = match[0];
//     this.family = match[1];

//     return
//   }

//   goToHome() {
//     console.log('Go home!')
//   }

//   static hovMach() {
//     console.log(`[eq]`)
//   }
// }

// Person.count = 0;

// const person1 = new Person(`Алексей`, `Данчин`, 36);
// person1.sayHello()

// person1.setfullName = `Юрий Ключевскиц`;
// person1.sayHello();

// console.log(person1.fullName);


// function f() {
//   return new Array;
// }

// class Animal {
//   constructor(name) {
//     this.name = name;
//     this.sound = ``;
//   }

//   voice() {
//     console.log(this.sound);
//   }
// }

// class Dog extends Animal {
//   constructor(name) {
//     super(name);
//     this.sound = `Gaf`;
//   }

//   voice() {
//     console.log(`Собачка говорит Гав, Блеать`);
//   }
// }

// class Cat extends Animal {
//   constructor(name) {
//     super(name);
//     this.sound = `Мяу`;
//   }
// }

// const dog = new Dog(`Бобик`);
// const cat = new Cat(`Мурзик`);
// dog.voice();
// cat.voice();


let arr = [-1, 3, 5, 8, 10, 15, 16, 20];

const BinarySearc = (a, key) => {
  let low = 0;
  let high = a.length - 1;

  while (low <= high) {
    let middle = Math.round(low + (high - low) / 2);

    if (key < a[middle]) {
      high = middle - 1;
    } else if (key > a[middle]) {
      low = middle + 1;
    } else {
      return middle;
    }
    return -1;
  }


};


console.log(BinarySearc(arr, 20))
