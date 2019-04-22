export const firstSchema = {
  title: {
    type: "string",
    required: true,
    label: "Title of announcement",
    maxSize: 20,
  },
  brand: {
    type: "select",
    required: true,
    label: "Make/Brand",
    options: [
      {
        title: 'Type 1'
      },
      {
        title: 'Type 2',
      },
      {
        title: 'Type 3',
      }
    ]
  },
  year: {
    type: "number",
    required: true,
    label: "Manufracting Year",
    maxSize: 4,
  },
  mileage: {
    type: "number",
    required: true,
    label: "Mileage",
  },
  fuel: {
    type: "radio",
    label: "Fuel Type",
    options: [
      {
        title: 'Type 1'
      },
      {
        title: 'Type 2',
      },
      {
        title: 'Type 3',
      }
    ]
  },
  color: {
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
};

export const secondSchema = {
  damaged: {
    type: 'bool',
    label: 'Vehicle Damaged',
    secondary: {
      details: {
        type: "string",
        label: "Details"
      }
    }
  },
  price: {
    type: "string",
    required: true,
    label: "Price"
  },
  currency: {
    type: "select",
    required: true,
    label: "Price",
    options: [
      {
        title: 'Type 1'
      },
      {
        title: 'Type 2',
      },
      {
        title: 'Type 3',
      }
    ]
  },
  description: {
    type: "string",
    required: true,
    label: 'Description'
  }
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