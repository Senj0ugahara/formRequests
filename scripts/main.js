// function validPhone () {
//   let reg = /^[\d\+7][\d\(\)\ -]{16,16}\d$/;
//   let phone = document.querySelector('.input[name="phone"]');
//   let valid = reg.test(phone.value);

//   if (valid) {
//     phone.classList.remove('inCorrect');
//     phone.classList.remove('correct');
//     phone.classList.add('correct');
//   } else if (phone.value.length < 18) {
//     alert('Номер телефона введен неправильно');
//     phone.classList.remove('correct');
//     phone.classList.remove('inCorrect');
//     phone.classList.add('inCorrect');
//   } else {
//     alert('Номер телефона введен неправильно');
//     phone.classList.remove('correct');
//     phone.classList.remove('inCorrect');
//     phone.classList.add('inCorrect');
//     return false;
//   }

//   return valid;
// }

// function validName() {
//   let reg = /[^а-яА-ЯёЁa-zA-Z0-9]+/g;
//   let name = document.querySelector('.input[name="name"]');
//   let valid = reg.test(name.value);

//   if (!valid && name.value.length !== 0) {
//     name.classList.remove('inCorrect');
//     name.classList.remove('correct');
//     name.classList.add('correct');
//   } else {
//     alert('Введите имя') 
//     name.classList.remove('correct');
//     name.classList.remove('inCorrect');
//     name.classList.add('inCorrect');
//     return false;
//   }

//   return valid;
// }

// function validMessage() {
//   let reg = /[^а-яА-ЯёЁa-zA-Z0-9]+/g;
//   let message = document.querySelector('.textarea');
//   let valid = reg.test(message.value);

//   if (!valid && message.value.length !== 0) {
//     message.classList.remove('inCorrect');
//     message.classList.remove('correct');
//     message.classList.add('correct');
//   } else {
//     alert('Сообщение имеет не допустимый формат')
//     message.classList.remove('correct');
//     message.classList.remove('inCorrect');
//     message.classList.add('inCorrect');
//     return false;
//   }

//   return valid;
// }

// function formSubmit(e) {
//   e.preventDefault();
//   validPhone();
//   validName();
//   validMessage();

//   const phoneNormalize = document.querySelector('.input[name="phone"]').value.replace(/[^0-9+]/g, '');
// }

const form = document.getElementById('form');
const formPhone = document.querySelector('.input[name="phone"]');
const formName = document.querySelector('.input[name="name"]');
const formMessage = document.querySelector('.textarea');

function formValidated() {
  let validated = true;
  const regPhone = /^[\d\+7][\d\(\)\ -]{16,16}\d$/.test(formPhone.value);
  const regName = /[^а-яА-ЯёЁa-zA-Z0-9]+/g.test(formName.value);
  const regMessage = /[^а-яА-ЯёЁa-zA-Z0-9]+/g.test(formMessage.value);

  const errorUiForm = (input) => {
    input.classList.remove('correct');
    input.classList.remove('inCorrect');
    input.classList.add('inCorrect');
  }

  const successUiForm = (input) => {
    input.classList.remove('correct');
    input.classList.remove('inCorrect');
    input.classList.add('correct');
  }

  if (!regPhone && formPhone.value.length < 18) {
    alert('Номер телефона введен неправильно');
    errorUiForm(formPhone);
    validated = false;
  } else {
    successUiForm(formPhone)
  }

  if (!regName && formName.value.length !== 0) {
    successUiForm(formName);
  } else {
    alert('Имя введено некорректно') 
    errorUiForm(formName);
    validated = false;
  }

  if (!regMessage && formMessage.value.length !== 0) {
    successUiForm(formMessage);
  } else {
    alert('Сообщение введено некорректно')
    errorUiForm(formMessage);
    validated = false;
  }

  return validated;
}

function dataForm() {
  let formObj = {};
  let formData = new FormData(form);

  formData.forEach((value, key) => formObj[key] = value);
  // formObj.phone.replace(/[^0-9+]/g, '');

  let request = new Request(form.action, {
    method: 'POST',
    body: JSON.stringify(formObj),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  fetch(request).then(
    function(response) {
      console.log(response)
      return response.json();
    },
    function(error) {
      console.log(error)
    }
  );

  console.log('Запрос отправляется')

  // let json = JSON.stringify(formObj);

  // let xhr = new XMLHttpRequest();
  // xhr.open('POST', 'scripts/formData.json', true)
  // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  // xhr.send(json);
  // console.log(json)
}

form.addEventListener('submit', e => {
  e.preventDefault();

  let validated = formValidated();

  if (!validated) {
    alert('Не удалось отправить форму, проверьте правильность заполненных данных!');
    return false;
  } else {
    alert('Форма успешна отправлена');
    dataForm();
  }
});