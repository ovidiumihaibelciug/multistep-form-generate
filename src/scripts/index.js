import '../styles.css';

import {steps} from "./data";
import {validateFields} from "./validation";
import {nextButton, generateFields, createFormSteps} from "./steps";
import modalStuff from './modal';


createFormSteps(steps);

generateFields();

validateFields();

nextButton(0); // show first step

modalStuff();