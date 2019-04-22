import {steps} from "./data";
import {nextButton, prevButton} from "./steps";



//
export const validateField = ({type, value, required = false, name, ...rest}) => {
  let errors = [];
  console.log('asd', required, type, name);

  if (required && !value && !rest.secondary && type !== 'bool' && required !== 'false') {
    console.log('required', required);
    errors = [...errors, "This field is required."];
  }

  switch (type) {
    case "string":
      break;
    case "number":
      const isNumber = /^\d+$/.test(value);

      errors = !isNumber ? [...errors, "This input can contain only numbers"] : errors;
      break;
    case "bool":
      errors = [];
      break;
  }

  const $errorField = document.querySelector(`errorfield[for="${name}"]`);

  if ($errorField) {
    $errorField.innerHTML = '';
  }
  const elem = document.querySelector(`custominput[name="${name}"] input`);
  if (rest.maxSize) {
    if (value.length > rest.maxSize) {
      errors = [...errors, 'Max Size exceed']
    }
  }

  errors.forEach(item => {
    const $error = document.createElement('p');
    $error.classList.add('error');
    $error.innerHTML = item;
    $errorField.appendChild($error);
  });


  if (errors.length && elem) {
    elem.style.borderBottomColor = 'red';
  } else if (elem) {
    elem.style.borderBottomColor = '#757575';
  }

  return errors;
};

export const validateFields = () => {
  const $buttons = document.querySelectorAll('.button--form');

  $buttons.forEach(button => button.addEventListener('click', e => {
    if (parseInt(e.target.dataset.id) === steps.length) {
      let newSchema = [];
      let fieldsErrors = [];
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

        const errors = validateField({
          name: parentElement.getAttribute('name'),
          type: parentElement.getAttribute('type'),
          required: parentElement.getAttribute('required'),
          value: item.value
        });
        console.log(errors);
        fieldsErrors = [...fieldsErrors, errors];
      });
      const errorsNumber = fieldsErrors ? fieldsErrors.reduce((acc, curr) => acc + curr.length, 0) : 0;
      console.log('a', errorsNumber);
      if (!errorsNumber)  {
        validateFields();
        console.log('RESULT', newSchema);
      }
    } else {
      let newSchema = [];
      let fieldsErrors = [];
      const step = document.querySelector(`step[data-id="${e.target.dataset.id}"]`);
      step.querySelectorAll("custominput input, custominput select").forEach(item => {
        let {parentElement} = item;
        newSchema = {
          name: parentElement.getAttribute('name'),
          type: parentElement.getAttribute('type'),
          required: parentElement.getAttribute('required'),
          secondary: parentElement.getAttribute('secondary'),
          value: item.value
        };

        const errors = validateField(newSchema);
        fieldsErrors = [...fieldsErrors, errors];
      });
      const errorsNumber = fieldsErrors ? fieldsErrors.reduce((acc, curr) => acc + curr.length, 0) : 0;
      console.log(fieldsErrors)
      if (!errorsNumber)  {
        nextButton(parseInt(e.target.dataset.id));
        validateFields();
      }
    }
  }));
  const backButtons = document.querySelectorAll('.button--back');

  backButtons.forEach(button => button.addEventListener('click', e => {
    prevButton(parseInt(e.target.dataset.id));
    validateFields();
  }));
};
