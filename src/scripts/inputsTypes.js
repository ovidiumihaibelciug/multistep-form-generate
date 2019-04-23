import {generateInput} from "./inputs";

export const inputTypeString = (input = null, highlight, bar, containerItem) => {
  input = document.createElement('input');

  highlight.classList.add('highlight');
  bar.classList.add('bar');

  containerItem.appendChild(input);
  input.setAttribute('type', 'text');
  containerItem.appendChild(bar);
  containerItem.appendChild(highlight);

  input.setAttribute('name', name);
  return input;
};

export const inputTypeNumber = (input = null, highlight, bar, containerItem) => {
  input = document.createElement('input');

  highlight.classList.add('highlight');
  bar.classList.add('bar');

  containerItem.appendChild(input);
  input.setAttribute('type', 'text');
  containerItem.appendChild(bar);
  containerItem.appendChild(highlight);

  input.setAttribute('name', name);
  return input;
};

export const inputTypeSelect = (input, options, containerItem) => {
  input = document.createElement('select');
  options.forEach(item => {
    let option = document.createElement('option');
    option.innerText = item.title;

    input.appendChild(option);
  });
  containerItem.appendChild(input);
  input.setAttribute('name', name);
  return input;
};

export const inputTypeRadio = (options, name, containerItem) => {
  options.forEach(item => {
    let outputInput = document.createElement('input');
    let outputLabel = document.createElement('label');
    let spanDesign = document.createElement('span');
    let spanText = document.createElement('span');

    containerItem.appendChild(outputLabel);
    outputLabel.classList.add('label__radio');

    outputLabel.appendChild(outputInput);
    outputLabel.appendChild(spanDesign);
    outputLabel.appendChild(spanText);

    spanDesign.classList.add('design');
    spanText.classList.add('text');

    spanText.innerHTML = item.title;

    outputInput.setAttribute('type', 'radio');
    outputInput.setAttribute('name', name);
    outputInput.setAttribute('value', item.title);
  });
};

export const inputTypeColor = containerItem => {
  let colorInput = document.createElement('input');
  let colorLabel = document.createElement('label');
  containerItem.appendChild(colorInput);

  colorInput.setAttribute('type', 'color');
  colorInput.setAttribute('name', name);

  containerItem.appendChild(colorLabel);
  return colorInput;
};

export const inputTypeBool = (input = null, secondary, container, containerItem) => {
  input = document.createElement('input');

  const labelWrapper = document.createElement('label');
  const span = document.createElement('span');

  containerItem.appendChild(labelWrapper);

  labelWrapper.setAttribute('for', 'final-toggle1');
  labelWrapper.setAttribute('class', 'final-toggle1');
  span.setAttribute('class', 'final__toggle-1__button');

  labelWrapper.appendChild(input);
  labelWrapper.appendChild(span);

  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', name);
  input.setAttribute('class', 'final__toggle-1__input');
  input.setAttribute('id', 'final-toggle1');

  Object.keys(secondary).map(key => {
    const newObj = {
      name: key,
      ...secondary[key],
      required: false,
    };
    generateInput(newObj, container, true);
  });
}