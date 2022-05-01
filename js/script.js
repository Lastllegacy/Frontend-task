const passwordInput = document.querySelector('.password-input');
const checkedPasInput = document.querySelector('.checked-password-input');
const emailInput = document.querySelector('.email-input');

const pasError = document.querySelector('.password');
const chPasError = document.querySelector('.checked-password');
const emailError = document.querySelector('.email');
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ ;

const popupInput = document.querySelector('.input-status');
const changeBox = document.querySelector('.subelement-change-status-button span');
const anotherBox = document.querySelector('.subelement-popup-input')
const statusText = document.querySelector('.text-of-status');
const closerBox = document.querySelector( '.subelement-popup-input button');
const buttonChanger = document.querySelector('.button-submit-changer');
const dateOfChange = document.querySelector('.up-time-log');

const dateNow = new Date();

const form = document.getElementById('form-update');

let data = {};

let pasPoint = 0;
let chPasPoint = 0;
let mailPoint = 0;
let counter = 0;

changeBox.addEventListener('click', () => {
   popupInput.value = statusText.textContent;
   if (counter == 0) {
      anotherBox.classList.add('show');
      counter = 1;
   } else {
      anotherBox.classList.remove('show');
      counter = 0;
   }
})

closerBox.addEventListener('click', () => {
   if(counter) {
      anotherBox.classList.remove('show');
      counter = 0;
      statusText.textContent = popupInput.value;
   }
})


passwordInput.addEventListener('input', (e) => {
   e.preventDefault();
   
   if (passwordInput.value == ''){
      passwordInput.id = 'input-error';
      pasError.textContent = 'Укажите пароль';
   } else if (passwordInput.value.length < 5){
      passwordInput.id = 'input-error';
      pasError.textContent = 'Используйте не менее 5 символов';
   } else {
      pasPoint = 1
      passwordInput.id = null;
      pasError.textContent = null;
   }
})

checkedPasInput.addEventListener('input', (e) => {
   e.preventDefault();

   if (checkedPasInput.value != passwordInput.value){
      checkedPasInput.id = 'input-error';
      chPasError.textContent = 'Пароли не совпадают';
   } else {
      chPasPoint = 1
      checkedPasInput.id = '';
      chPasError.textContent = null;
   }
})

emailInput.addEventListener('input', (e) => {
   e.preventDefault();


   if (!(emailInput.value.match(emailPattern))){
      emailInput.id = 'input-error';
      emailError.textContent = 'Неверный email'
   } else if (emailInput.value == ''){
      emailInput.id = 'input-error';
      emailError.textContent = 'Укажите E-mail'
   } else {
      mailPoint = 1;
      emailInput.id = ''
      emailError.textContent = null
   }
} )

form.addEventListener('submit', e => {
   if (!pasPoint) {
      e.preventDefault();
      if (passwordInput.value == ''){
         passwordInput.id = 'input-error';
         pasError.textContent = 'Укажите пароль';
      } else if (passwordInput.value.length < 5){
         passwordInput.id = 'input-error';
         pasError.textContent = 'Используйте не менее 5 символов';
      } 
   }
   else if (!chPasPoint){
      e.preventDefault()
      if (checkedPasInput.value != passwordInput.value){
         checkedPasInput.id = 'input-error';
         chPasError.textContent = 'Пароли не совпадают';
      } else {
         chPasPoint = 1
         checkedPasInput.id = '';
         chPasError.textContent = null;
      }
   }
   else if(!mailPoint) {
      e.preventDefault()
      if (!(emailInput.value.match(emailPattern))){
         emailInput.id = 'input-error';
         emailError.textContent = 'Неверный email'
      } else if (emailInput.value == ''){
         emailInput.id = 'input-error';
         emailError.textContent = 'Укажите E-mail'
      } else {
         mailPoint = 1;
         emailInput.id = ''
         emailError.textContent = null;
      }
   }
   else if (mailPoint && chPasPoint && pasPoint) {
      dateOfChange.textContent = 'последние изменения ' + dateNow.toLocaleDateString() + ' в ' + dateNow.toLocaleTimeString();
      let fd = new FormData(form);
      for (let [key, prop] of fd) {
         data[key] = prop;
      }
      data = JSON.stringify(data, null, 2);
      console.log(data);
   }
})

document.addEventListener('click', e => {
   if (!e.target.closest('.subelement-change-status-button') && counter ) {
      anotherBox.classList.remove('show');
      counter = 0;
    }
});


// From this string starting to be js for custom-select 

const CLASS_NAME_SELECT = 'select';
const CLASS_NAME_ACTIVE = 'select_show';
const CLASS_NAME_SELECTED = 'select__option_selected';
const SELECTOR_ACTIVE = '.select_show';
const SELECTOR_DATA = '[data-select]';
const SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';
const SELECTOR_OPTION_SELECTED = '.select__option_selected';

class CustomSelect {
  constructor(target, params) {
    this._elRoot = typeof target === 'string' ? document.querySelector(target) : target;
    this._params = params || {};
    this._onClickFn = this._onClick.bind(this);
    if (this._params['options']) {
      this._elRoot.classList.add(CLASS_NAME_SELECT);
      this._elRoot.innerHTML = CustomSelect.template(this._params);
    }
    this._elToggle = this._elRoot.querySelector(SELECTOR_DATA_TOGGLE);
    this._elRoot.addEventListener('click', this._onClickFn);
  }
  _onClick(e) {
    const target = e.target;
    const type = target.closest(SELECTOR_DATA).dataset.select;
    switch (type) {
      case 'toggle':
        this.toggle();
        break;
      case 'option':
        this._changeValue(target);
        break;
    }
  }
  _update(option) {
    option = option.closest('.select__option');
    const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
    if (selected) {
      selected.classList.remove(CLASS_NAME_SELECTED);
    }
    option.classList.add(CLASS_NAME_SELECTED);
    this._elToggle.textContent = option.textContent;
    this._elToggle.value = option.dataset['value'];
    this._elToggle.dataset.index = option.dataset['index'];
    this._elRoot.dispatchEvent(new CustomEvent('select.change'));
    this._params.onSelected ? this._params.onSelected(this, option) : null;
    return option.dataset['value'];
  }
  _reset() {
    const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
    if (selected) {
      selected.classList.remove(CLASS_NAME_SELECTED);
    }
    this._elToggle.textContent = 'Выберите из списка';
    this._elToggle.value = '';
    this._elToggle.dataset.index = -1;
    this._elRoot.dispatchEvent(new CustomEvent('select.change'));
    this._params.onSelected ? this._params.onSelected(this, null) : null;
    return '';
  }
  _changeValue(option) {
    if (option.classList.contains(CLASS_NAME_SELECTED)) {
      return;
    }
    this._update(option);
    this.hide();
  }
  show() {
    document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
      select.classList.remove(CLASS_NAME_ACTIVE);
    });
    this._elRoot.classList.add(CLASS_NAME_ACTIVE);
  }
  hide() {
    this._elRoot.classList.remove(CLASS_NAME_ACTIVE);
  }
  toggle() {
    if (this._elRoot.classList.contains(CLASS_NAME_ACTIVE)) {
      this.hide();
    } else {
      this.show();
    }
  }
  dispose() {
    this._elRoot.removeEventListener('click', this._onClickFn);
  }
  get value() {
    return this._elToggle.value;
  }
  set value(value) {
    let isExists = false;
    this._elRoot.querySelectorAll('.select__option').forEach((option) => {
      if (option.dataset['value'] === value) {
        isExists = true;
        return this._update(option);
      }
    });
    if (!isExists) {
      return this._reset();
    }
  }
  get selectedIndex() {
    return this._elToggle.dataset['index'];
  }
  set selectedIndex(index) {
    const option = this._elRoot.querySelector(`.select__option[data-index="${index}"]`);
    if (option) {
      return this._update(option);
    }
    return this._reset();
  }
}

CustomSelect.template = params => {
  const name = params['name'];
  const options = params['options'];
  const targetValue = params['targetValue'];
  let items = [];
  let selectedIndex = -1;
  let selectedValue = '';
  let selectedContent = 'Выберите из списка';
  options.forEach((option, index) => {
    let selectedClass = '';
    if (option[0] === targetValue) {
      selectedClass = ' select__option_selected';
      selectedIndex = index;
      selectedValue = option[0];
      selectedContent = option[1];
    }
    items.push(`<li class="select__option${selectedClass}" data-select="option" data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
  });
  return `<button type="button" class="select__toggle" name="${name}" value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">${selectedContent}</button>
  <div class="select__dropdown">
    <ul class="select__options">${items.join('')}</ul>
  </div>`;
};


document.addEventListener('click', (e) => {
  if (!e.target.closest('.select')) {
    document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
      select.classList.remove(CLASS_NAME_ACTIVE);
    });
  }
});


const loadJSON = (callback) => {
   const xObj = new XMLHttpRequest();
   xObj.overrideMimeType("application/json");
   // 1. replace './data.json' with the local path of your file
   xObj.open('GET', './js/cities.json', true);
   xObj.onreadystatechange = () => {
       if (xObj.readyState === 4 && xObj.status === 200) {
           // 2. call your callback function
           callback(xObj.responseText);
       }
   };
   xObj.send(null);
}



const init = () => {
   loadJSON((response) => {
      // 3. parse JSON string into JSON Object
      //  console.log('response =', response);
      const json = JSON.parse(response);
      //  console.log('your local JSON =', JSON.stringify(json, null, 4));
      // 4. render to your page
      let arrayOfCities = [];
      json.forEach((key) => {
         if(key.population > 50000){
            arrayOfCities.push([key.city.toLowerCase(),key.city]);
         }
      })

      const select1 = new CustomSelect('#select-1', {
         name: 'car',
         options: arrayOfCities // опции
      }); 
   });
}
 
init();








// let object;
// let arrayOfCities = [['hehe','hehe']];
// let newArray = [];
// let httpRequest = new XMLHttpRequest(); // asynchronous request
// httpRequest.open("GET", "./js/cities.json", true);
// httpRequest.send();
// httpRequest.addEventListener("readystatechange", function() {
//     if (this.readyState === this.DONE) {
//       	// when the request has completed
//         arrayOfCities = [] 
//         object = JSON.parse(this.response);
//         object.forEach((key) => {
//            if(key.population > 50000){
//             arrayOfCities.push([key.city.toLowerCase(),key.city]);
//            }
//         })
//         console.log(arrayOfCities);
//     }
// });