import '../styles/styles.css';

import {steps} from "./data";
import {validateFields,} from "./validation";
import {nextButton, generateFields, createFormSteps} from "./steps";
import modalStuff from './modal';

(() => {
  createFormSteps(steps);

  generateFields();

  nextButton(0); // show first step

  validateFields();

  modalStuff();

})(document);

