import './form-elements.scss';

import {Dropdown} from '@blocks/dropdown/dropdown.js';
import {Checkbox} from '@blocks/expand-checkbox/expand-checkbox.js';

document.querySelectorAll('.dropdown').forEach(function(item) {
    const dropdown = new Dropdown(item)
    // console.log(dropdown)
})

document.querySelectorAll('.expand-checkbox').forEach(function(item) {
    const checkbox = new Checkbox(item)
    // console.log(checkbox)
})

