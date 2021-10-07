import './form-elements.scss';

import {Dropdown} from '@blocks/dropdown/dropdown.js';

document.querySelectorAll('.dropdown').forEach(function(item) {
    const dropdown = new Dropdown(item)
    // console.log(dropdown)
})