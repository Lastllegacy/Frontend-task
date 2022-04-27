const passwordInput = document.querySelector('.password-input')
const checkedPasInput = document.querySelector('.checked-password-input')
const emailInput = document.querySelector('.email-input')

const pasError = document.querySelector('.password')
const chPasError = document.querySelector('.checked-password')
const emailError = document.querySelector('.email')
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ ;

const form = document.getElementById('form-update');
let pasPoint = 0;
let chPasPoint = 0;
let mailPoint = 0;

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
         emailError.textContent = null
      }
   }

})
