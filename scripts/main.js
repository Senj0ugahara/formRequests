const form = document.getElementById('form');
const formPhone = document.querySelector('.input[name="phone"]');
const formName = document.querySelector('.input[name="name"]');
const formMessage = document.querySelector('.textarea');
const btnOpen = document.getElementById('open');

btnOpen.addEventListener('click', function() {
  form.classList.toggle('hidden');
})

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

async function dataForm() {
  let formObj = {};
  let formData = new FormData(form);

  formData.forEach((value, key) => formObj[key] = value);
  formObj.phone = formObj.phone.replace(/[^0-9+]/g, '');
  
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(formObj),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
    let resultRequest = document.createElement('p');
    resultRequest.innerHTML = JSON.stringify(json);
    document.body.append(resultRequest);
  })

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