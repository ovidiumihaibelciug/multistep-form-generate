# Job Test

I took this challenge a step further so I made
a multi-step form generated based on a given schema.

Firstly it takes a steps array which contains the schema
for each step.
```js
export const steps = [
  {
    id: 1,
    schema: firstSchema,
  },
  {
    id: 2,
    schema: secondSchema,
  }
];
```

Each object represents a step of the form.

A schema contains the details of the inputs of the 
its step.

```javascript
export const firstSchema = {
  ['input name']: {
    type: ['input type'],
    required: ['is this input required'],
    label: ['label'],
    maxSize: ['max length of value'],
  },
  ...
}
```
Example: 
```
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
 }
```

##Schema docs

##### type:
1. string - a basic input type text
2. number - an input type text but with js validations so the user will have to type only numbers
3. select - a select element, in this case the object must have an ``options`` field which represents the options of the select
```$xslt
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
```
4, radio - it will generate inputs type radio basted on the given ``options`` - similar to select

5, bool - it will generate an input type checkbox, also you can provide a ``secondary`` field (where you will put another schema) so that, if the checkbox is true, the secondary fields will be shown.

6, color - it will generate a input type color


##### required (Bool)
if this is set to true, the user will have to complete the input


##### label (String)
The text shown above the input


##### maxSize (Number)
The maximum of characters an user can type on that input, if he exceed that limit he will get an error

##### options (Array)
This property can appear only on ``type`` ``select`` or ``radio``, and it represents ``option`` elements on the select, and input type radio elements on type ``radio``

##### secondary (Object - Schema)
This property is present only on ``type`` ``bool`` and it represents the inputs that will appear if the checkbox is true


##Other Stuff
``CustomInput`` it's an hoc so I can get easier some info about the input

``ErrorField`` hoc over errors
