const schema = {
  title: {
    type: "string",
    required: true,
    label: "Lorem ipsum"
  },
  amount: {
    type: "number",
    required: true,
    label: "Lorem ipsum dolor situm"
  },
  asd: {
    type: "string",
    required: true,
    label: "String"
  },
  asd2: {
    type: "select",
    options: [
      {
        title: 'Choose'
      },
      {
        title: 'Asd',
      },
      {
        title: '123',
      }
    ]
  },
  asd3: {
    type: "radio",
    label: "Choose something",
    options: [
      {
        title: 'Choose',
      },
      {
        title: 'Asd',
      },
      {
        title: '123',
      }
    ]
  },
  asd4: {
    type: 'color',
    label: 'Choose a color',
    options: [
      {
        color: 'red',
      },
      {
        color: 'blue'
      }
    ]
  },
  bool: {
    type: 'bool',
    label: 'Bool FIeld',
    secondary: {
      title123: {
        type: "string",
        required: true,
        label: "Lorem ipsum"
      }
    }
  }
};

const secondSchema = {
  title2: {
    type: "string",
    required: true,
    label: "Title2"
  },
};

const steps = [
  {
    id: 1,
    schema,
    btn: '#btn-1',
  },
  {
    id: 2,
    schema: secondSchema,
    btn: '#btn-2',
  }
];

const $container = document.querySelector('.root');

steps.forEach(({ id }) => {
  const $root = document.createElement('step');
  $container.appendChild($root);
  $root.setAttribute('data-id', id);
});



const createErrorField = (rules, name) => {

};

const chooseInput = (block, container) => {
  const { type, required = false, name } = block;

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

  createErrorField(rules = {}, name);

  container.appendChild(CustomInput);
  CustomInput.appendChild(ErrorField);
  CustomInput.setAttribute('class', 'input__main');

  generateItem(block, container);
};

const generateItem = ({type, ...rest}, container) => {
  const containerItem = document.querySelector(`custominput[name="${rest.name}"]`);

  const label = document.createElement('label');

  const name = containerItem.getAttribute('name');

  containerItem.appendChild(label);

  label.innerText = rest.label || '';
  let input;

  switch (type) {
    case "string":
      input = document.createElement('input');
      containerItem.appendChild(input);

      input.setAttribute('name', name);
      break;
    case "number":
      input = document.createElement('input');
      containerItem.appendChild(input);

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

        outputLabel.innerHTML = item.title;

        containerItem.appendChild(outputLabel);
        containerItem.appendChild(outputInput);

        outputInput.setAttribute('type', 'radio');
        outputInput.setAttribute('name', rest.name);
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

        containerItem.appendChild(input);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', name);
        Object.keys(rest.secondary).map(key => {
          const newObj = {
            name: key,
            ...rest.secondary[key]
          };
          chooseInput(newObj, container);
        });
        break;
    default:
      console.log('123')
  }
};

const nextButton = currentNumber => {
  showCurrentInput(currentNumber + 1);
};


steps.forEach(item => {
  Object.keys(item.schema).map(key => {
    const newObj = {
      name: key,
      ...item.schema[key]
    };
    const $test = document.querySelector(`step[data-id="${item.id}"]`);
    chooseInput(newObj, $test);
  });
});

const showCurrentInput = number => {
  document.querySelectorAll('step').forEach(item => {
    if (parseInt(item.dataset.id) !== parseInt(number)) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
      const { id, btn } = steps.find(item => item.id === number);
      const $button = document.createElement('button');
      $button.setAttribute('id', btn);
      $button.setAttribute('data-id', id);
      $button.innerHTML = id === steps.length - 1 ? 'Next' : 'Submit';
      $button.classList.add('button-form');

      item.appendChild($button);
    }
  });

  const $buttons = document.querySelectorAll('.button-form');

  $buttons.forEach(button => button.addEventListener('click', e => {
    console.log(steps.length);
    if (parseInt(e.target.dataset.id) === steps.length) {
      console.log('a');
      let newSchema = [];
      document.querySelectorAll("custominput input, custominput select").forEach(item => {
        const { parentElement } = item;

        newSchema = [
          ...newSchema,
          {
            name: parentElement.getAttribute('name'),
            type: parentElement.getAttribute('type'),
            required: parentElement.getAttribute('required'),
            value: item.value
          }
        ];

        validateFields(newSchema);

        console.log(item.parentElement.getAttribute('type'));
        console.log(item.name + " - " + item.value);
      });
      console.log(newSchema);
      console.log("get data");
    } else {
      nextButton(parseInt(e.target.dataset.id));
    }
  }))
};


const validateFields = (schema) => {

}


// showCurrentInput(1);
nextButton(0);

