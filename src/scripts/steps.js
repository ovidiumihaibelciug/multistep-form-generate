import {firstSchema, secondSchema, steps} from "./data";
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
      const $buttonBack = document.createElement('button');

      $buttonBack.setAttribute('id', btn);
      $buttonBack.setAttribute('data-id', id);
      $buttonBack.innerHTML = "Back";
      $buttonBack.classList.add('button');
      $buttonBack.classList.add('button--back');

      $button.setAttribute('id', btn);
      $button.setAttribute('data-id', id);
      $button.innerHTML = id === steps.length - 1 ? 'Next' : 'Submit';
      $button.classList.add('button');
      $button.classList.add('button--form');

      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('modal__footer');

      item.appendChild(buttonDiv);
      if (id !== 1) {
        buttonDiv.appendChild($buttonBack);
      }
      buttonDiv.appendChild($button);
    }
  });

  document.querySelectorAll("custominput input, custominput select").forEach(item => {
    item.addEventListener('blur', e => {
      const {parentElement} = e.target;
      item.classList.add('input--active');
      const elem = {
        name: parentElement.getAttribute('name'),
        type: parentElement.getAttribute('type'),
        required: parentElement.getAttribute('required'),
        maxSize: parentElement.getAttribute('maxsize'),
        value: item.value,
      };

      validateField(elem);
    })
  });

  document.querySelectorAll('custominput input[type="radio"]').forEach(item => {
    item.addEventListener('click', e => {
      const {parentElement} = e.target;

      const elem = {
        name: parentElement.getAttribute('name'),
        type: parentElement.getAttribute('type'),
        required: parentElement.getAttribute('required'),
        value: item.checked && item.value
      };

      validateField(elem);
    })
  });
  document.querySelectorAll('custominput input[type="checkbox"]').forEach(item => {
    item.addEventListener('change', e => {
      const {parentElement: {parentElement}} = e.target;

      const elem = {
        name: parentElement.getAttribute('name'),
        type: parentElement.getAttribute('type'),
        required: parentElement.getAttribute('required'),
        value: item.checked && item.value
      };

      Object.keys(secondSchema[elem.name].secondary).map(key => {
        const fieldObj = {
          name: key,
          ...secondSchema[elem.name].secondary[key],
          required: false,
        };

        const field = document.querySelector(`custominput[name="${fieldObj.name}"]`);
        if (e.target.checked) {
          field.classList.remove('input--secondary');
        } else {
          field.classList.add('input--secondary');
        }
      });

      validateField(elem)
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
  const progress = document.querySelector('.progress');
  const initialWidth = (100 * (currentNumber + 1)) / steps.length + 1;

  progress.style.width = (initialWidth <= 100 ? initialWidth : 100) + '%';
};

export const prevButton = currentNumber => {
  showCurrentInput(currentNumber - 1);
  const progress = document.querySelector('.progress');
  const initialWidth = (100 * (currentNumber)) / steps.length + 1;

  progress.style.width = (initialWidth <= 100 ? initialWidth : 100) + '%';
};
