import {steps} from "./data";
import {validateField} from "./validation";
import {$container} from "./elements";
import {generateInput} from "./inputs";

export const showCurrentInput = number => {
  document.querySelectorAll('step').forEach(item => {
    item.style.position = 'relative';
    if (parseInt(item.dataset.id) !== parseInt(number)) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
      const {id, btn} = steps.find(item => item.id === number);
      const $button = document.createElement('button');
      $button.setAttribute('id', btn);
      $button.setAttribute('data-id', id);
      $button.innerHTML = id === steps.length - 1 ? 'Next' : 'Submit';
      $button.classList.add('button');
      $button.classList.add('button--form');

      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('modal__footer');
      item.appendChild(buttonDiv);
      buttonDiv.appendChild($button);
    }
  });

  document.querySelectorAll("custominput input, custominput select").forEach(item => {
    item.addEventListener('blur', e => {
      const {parentElement} = e.target;
      item.classList.add('input--active');
      console.log('asd', e.target.type);
      const elem = {
        name: parentElement.getAttribute('name'),
        type: parentElement.getAttribute('type'),
        required: parentElement.getAttribute('required'),
        value: item.value
      };

      console.log(validateField(elem));
    })
  });

  document.querySelectorAll('custominput input[type="radio"]').forEach(item => {
    item.addEventListener('click', e => {
      const {parentElement} = e.target;

      const elem = {
        name: parentElement.getAttribute('name'),
        type: parentElement.getAttribute('type'),
        required: parentElement.getAttribute('required'),
        value: item.clicked && item.value
      };

      console.log(elem, item.value);

      console.log(validateField(elem));
    })
  });
};

export const createFormSteps = () => {
  steps.forEach(({id}) => {
    const $root = document.createElement('step');

    $container.appendChild($root);
    $root.setAttribute('data-id', id);
  });
};

export const generateFields = () => {
  steps.forEach(item => {
    Object.keys(item.schema).map(key => {
      const fieldObj = {
        name: key,
        ...item.schema[key]
      };
      const $step = document.querySelector(`step[data-id="${item.id}"]`);
      generateInput(fieldObj, $step);
    });
  });
};


export const nextButton = currentNumber => {
  showCurrentInput(currentNumber + 1);
};

export const prevButton = currentNumber => {
  showCurrentInput(currentNumber - 1);
};

export default {
  nextButton,
  prevButton,
  showCurrentInput
}

