export const firstSchema = {
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

export const secondSchema = {
  title2: {
    type: "string",
    required: true,
    label: "Title2"
  },
};

export const steps = [
  {
    id: 1,
    schema: firstSchema,
    btn: '#btn-1',
  },
  {
    id: 2,
    schema: secondSchema,
    btn: '#btn-2',
  }
];