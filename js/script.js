


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

const passInput = '.password-input';
const passError = '.password-error';

const confPassInput = '.checked-password-input';
const confPassError = '.checked-password-error';

const mailInput = '.email-input';
const mailError = '.email-error';


class validationHelper {

   constructor(input,error) {
      this.input = document.querySelector(input);
      this.error = document.querySelector(error);
   }
   
   checkBlank() {
      if(this.input.value == '') {
         this.input.id = 'input-error';
         this.error.textContent = 'Введите значение';
         return true
      } else return false
   }

   passwordLength(input,error) {
      input = this.input;
      error = this.error;
      if (this.checkBlank()) {
         this.checkBlank()
      } else if(input.value.length < 5){
         input.id = 'input-error';
         error.textContent = 'Используйте не менее 5 символов';
      } else {
         input.id = null;
         error.textContent = null;
         return true;
      }
   }

   confirmationPassword(input,error) {
      input = this.input;
      error = this.error;
      if (this.checkBlank()) {
         this.checkBlank()
      } else if(input.value != document.querySelector(passInput).value){
         input.id = 'input-error';
         error.textContent = 'Пароли не совпадают';
      } else {
         input.id = null;
         error.textContent = null;
         return true;
      }
   }

   mailCheck(input,error){
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ ;
      input = this.input;
      error = this.error;
      if (this.checkBlank()) {
         this.checkBlank();
      } else if (!(input.value.match(emailPattern))){
         input.id = 'input-error';
         error.textContent = 'Неверный email'
      } else {
         input.id = null;
         error.textContent = null;
         return true
      }
   }
}

document.addEventListener('input', (e) => {
   if(e.target.closest(passInput)) {
      new validationHelper(passInput,passError).passwordLength();
   } else if(e.target.closest(confPassInput)) {
      new validationHelper(confPassInput,confPassError).confirmationPassword();
   } else if(e.target.closest(mailInput)) {
      new validationHelper(mailInput,mailError).mailCheck();
   }
})



document.addEventListener('click', e => {
   if (!e.target.closest('.subelement-change-status-button')) {
      anotherBox.classList.remove('show');
      counter = 0;
   }
   if (e.target.closest('.subelement-change-status-button span')) {
      popupInput.value = statusText.textContent;
      if (counter == 0) {
         anotherBox.classList.add('show');
         counter = 1;
      } else {
         anotherBox.classList.remove('show');
         counter = 0;
      }
   }
   if(e.target.closest('.subelement-popup-input button')){
      if(counter) {
         anotherBox.classList.remove('show');
         counter = 0;
         statusText.textContent = popupInput.value;
      }
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
    items.push(`<li class="select__option${selectedClass}" data-select="option" data-value="${option[0]}" data-index="${index}"> ${option[1]}</li> `);
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

let select1,select2;


// callback is a function that passes to another func as an argument
// К примеру здесь, мы передаём значение response.json() из fetch запроса в jsonCallback только если получили положительный ответ, иначе возвращаем null
// fetch - глобальный объект в JS, позволяет делать сетевые запросы и круче чем XMLHttpRequest
// Передавая в fetch ссылку, куда мы хотим попасть, при помощи метода .then в качестве аргумента мы принимаем ответ(response) и далее проверяем, успешно ли мы добрались по ссылки. При помощи метода .ok аргумента мы выполняем проверку
// Затем возвращаем .json() в нашем случае, так как по ссылке находился некоторый файл json 
// Самое главное, что здесь возвращаемое значение будет равно не json-файлу а Promise
// Promise - это не завершённый асинхронный код, то есть запрос, мы как бы даём обещание, что там что-то лежит
// Для того, чтобы продолжить работать с данными, которые мы получили мы должны дождаться окончательного ответа, для этого мы пишем await перед возвращаемым значением, чтобы дать понять JS, что нужно дождаться окончательного ответа и затем выполнять код связанный с этим ответом

async function loaderJson (url, jsonCallback) {
   const URL = url;
   await fetch(URL)
      .then(response => response.ok ? jsonCallback(response.json()) : null);
}


// Далее здесь в анонимной функции мы получаем значение переданное в колбэк как result и работаем с ним
// as an argument loadJson takes an anonymous function and then sort it and creates custom-select with options we need
loaderJson('./js/cities.json', (async (resultJson) => {
   let JsonHelper =  await resultJson
   let arrayHelper = [];
   let most = 0;
   let neededCity = '';

   for (let item of JsonHelper) {
      if(item.population > most) {
         most = Number(item.population);
         neededCity = item.city;
      }
   }

   for (let item of JsonHelper){
      if(item.population > 50000 && item.city != neededCity) {
         arrayHelper.push([item.city,item.city]);
      }
   }
   arrayHelper.sort();

   const arrayOfCities = [[neededCity,neededCity]].concat(arrayHelper);

   select1 = new CustomSelect('#select-1', {
      name: 'city-choose',
      options: arrayOfCities // опции университетов
   })
}))

loaderJson('http://universities.hipolabs.com/search?country=United+Kingdom' , (async (resultJson) => {
   let JsonHelper = await resultJson;
   let arrayOfUniversities = [];
   for (let item of JsonHelper) {
      arrayOfUniversities.push([item.name,item.name])
   }
   select2 = new CustomSelect('#select-2', {
      name: 'university-choose',
      options: arrayOfUniversities // опции университетов
   })

} ))

form.addEventListener('submit', e => {
   const passwordObject = new validationHelper(passInput,passError).passwordLength();
   const confirmationObject = new validationHelper(confPassInput,confPassError).confirmationPassword();
   const mailObject = new validationHelper(mailInput,mailError).mailCheck();
   if (!passwordObject) {
      e.preventDefault();
      passwordObject;
   }
   else if (!confirmationObject){
      e.preventDefault();
      confirmationObject;
   }
   else if(!mailObject) {
      e.preventDefault();
      mailObject;
   }
   else if (passwordObject && confirmationObject && mailObject && select1.value && select2.value ) {
      dateOfChange.textContent = 'последние изменения ' + dateNow.toLocaleDateString() + ' в ' + dateNow.toLocaleTimeString();
      let fd = new FormData(form);
      for (let [key, prop] of fd) {
         data[key] = prop;
      }
      data['city-choose'] = select1.value;
      data['university-choose'] = select2.value;
      data = JSON.stringify(data, null, 2);
      console.log(data);
      
   }
});