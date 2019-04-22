export const generateInput = (block, container) => {
  const {type, required = false, name} = block;

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
    }
  ];

  const errorAttributes = [
    {
      name: 'for',
      value: name
    }
  ];

  const CustomInput = document.createElement('CustomInput');
  const ErrorField = document.createElement('ErrorField');


  inputAttributes.forEach(({name, value}) => {
    CustomInput.setAttribute(name, value);
  });

  errorAttributes.forEach(({name, value}) => {
    ErrorField.setAttribute(name, value);
  });

  container.appendChild(CustomInput);

  CustomInput.setAttribute('class', 'input__main');
  CustomInput.classList.add('group');

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
      input = document.createElement('input');

      highlight.classList.add('highlight');
      bar.classList.add('bar');

      containerItem.appendChild(input);
      input.setAttribute('type', 'text');
      containerItem.appendChild(bar);
      containerItem.appendChild(highlight);

      input.setAttribute('name', name);
      break;
    case "number":
      input = document.createElement('input');

      highlight.classList.add('highlight');
      bar.classList.add('bar');

      containerItem.appendChild(input);
      input.setAttribute('type', 'text');
      containerItem.appendChild(bar);
      containerItem.appendChild(highlight);

      input.setAttribute('name', name);

      break;
    case "select":
      input = document.createElement('select');
      rest.options.forEach(item => {
        let option = document.createElement('option');
        option.innerText = item.title;

        input.appendChild(option);
      });
      containerItem.appendChild(input);
      input.setAttribute('name', name);
      break;
    case "radio":
      rest.options.forEach(item => {
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
        outputInput.setAttribute('name', rest.name);
        outputInput.setAttribute('value', item.title);
      });
      break;
    case "color":
      let colorInput = document.createElement('input');
      let colorLabel = document.createElement('label');
      containerItem.appendChild(colorInput);

      colorInput.setAttribute('type', 'color');
      colorInput.setAttribute('name', name);

      containerItem.appendChild(colorLabel);

      break;
    case "bool":
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

      Object.keys(rest.secondary).map(key => {
        const newObj = {
          name: key,
          ...rest.secondary[key]
        };
        generateInput(newObj, container);
      });
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