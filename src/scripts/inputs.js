import {
  inputTypeNumber,
  inputTypeString,
  inputTypeSelect,
  inputTypeRadio,
  inputTypeColor,
  inputTypeBool
} from "./inputsTypes";

export const generateInput = (block, container, isSecondary = false) => {
  const {type, required = false, name, ...rest} = block;

  const inputAttributes = [
    {
      name: 'type',
      value: type,
    },
    {
      name: 'name',
      value: name,
    },
    {
      name: 'required',
      value: required
    },
    {
      name: 'id',
      value: name,
    },
  ];

  const errorAttributes = [
    {
      name: 'for',
      value: name
    }
  ];

  const CustomInput = document.createElement('CustomInput');
  const ErrorField = document.createElement('ErrorField');

  if (isSecondary) {
    CustomInput.setAttribute('secondary', 'true');
  }

  if (rest.maxSize) {
    CustomInput.setAttribute('maxSize', rest.maxSize);
  }

  inputAttributes.forEach(({name, value}) => {
    CustomInput.setAttribute(name, value);
  });

  errorAttributes.forEach(({name, value}) => {
    ErrorField.setAttribute(name, value);
  });

  container.appendChild(CustomInput);

  CustomInput.setAttribute('class', 'input__main');
  CustomInput.classList.add('group');
  if (isSecondary) {
    CustomInput.classList.add('input--secondary');
  }

  chooseInputType(block, container);
  CustomInput.appendChild(ErrorField);
};

const chooseInputType = ({type, ...rest}, container) => {
  const containerItem = document.querySelector(`custominput[name="${rest.name}"]`);
  const name = containerItem.getAttribute('name');

  let bar = document.createElement('span');
  let highlight = document.createElement('span');

  let input;

  if (type === 'radio' || type === 'color' || type === 'bool') {
    const label = document.createElement('label');
    containerItem.appendChild(label);
    label.classList.add('label__radio');
    label.innerText = rest.label || '';
  }

  switch (type) {
    case "string":
      input = inputTypeString(input, highlight, bar, containerItem);
      break;
    case "number":
      input = inputTypeNumber(input, highlight, bar, containerItem);
      break;
    case "select":
     input = inputTypeSelect(input, rest.options, containerItem);
      break;
    case "radio":
      inputTypeRadio(rest.options, rest.name, containerItem);
      break;
    case "color":
      input = inputTypeColor(containerItem);
      break;
    case "bool":
     input = inputTypeBool(input, rest.secondary, container, containerItem);
      break;
    default:
      console.log('123')
  }
  if (type !== 'bool' && type !== 'radio' && type !== 'color') {
    const label = document.createElement('label');

    containerItem.appendChild(label);
    label.classList.add('label');
    label.innerText = rest.label || '';
  }
};