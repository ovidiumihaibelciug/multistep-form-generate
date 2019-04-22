import {steps} from "./data";
import {nextButton} from "./steps";

export const validateField = ({type, value, required, name}) => {
  let errors = [];

  if (required && !value) {
    errors = [...errors, "This field is required."];
  }

  switch (type) {
    case "string":
      break;
    case "number":
      const isNumber = /^\d+$/.test(value);

      errors = !isNumber ? [...errors, "This input can contain only numbers"] : errors;
  }

  const $errorField = document.querySelector(`errorfield[for="${name}"]`);

  if ($errorField) {
    $errorField.innerHTML = '';
  }

  errors.forEach(item => {
    const $error = document.createElement('p');
    $error.classList.add('error');
    $error.innerHTML = item;
    $errorField.appendChild($error);
  });
  const elem = document.querySelector(`custominput[name="${name}"] input`);

  if (errors.length) {
    elem.style.borderBottomColor = 'red';
    console.log(elem);
  } else {
    elem.style.borderBottomColor = '#757575';
  }

  return errors;
};

export const validateFields = () => {
  const $buttons = document.querySelectorAll('.button--form');

  $buttons.forEach(button => button.addEventListener('click', e => {
    if (parseInt(e.target.dataset.id) === steps.length) {
      let newSchema = [];
      document.querySelectorAll("custominput input, custominput select").forEach(item => {
        let {parentElement} = item;
        if (item.type === 'checkbox' || !item.type) {
          parentElement = parentElement.parentElement;
        }

        newSchema = item.type !== 'radio' ? [
          ...newSchema,
          {
            name: parentElement.getAttribute('name'),
            type: parentElement.getAttribute('type'),
            required: parentElement.getAttribute('required'),
            value: item.value
          }
        ] : item.checked ? [...newSchema, {
          name: parentElement.getAttribute('name'),
          type: parentElement.getAttribute('type'),
          required: parentElement.getAttribute('required'),
          value: item.value
        }] : [...newSchema];

        validateFields(newSchema);
      });
      console.log(newSchema);
      console.log("get data");
    } else {
      nextButton(parseInt(e.target.dataset.id));
    }
  }));

};
