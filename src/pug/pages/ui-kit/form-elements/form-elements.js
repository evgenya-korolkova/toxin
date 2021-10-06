import './form-elements.scss';

import {Dropdown} from '@/pug/mixins/dropdown/dropdown.js';

document.querySelectorAll('.dropdown').forEach(function(item) {
    const dropdown = new Dropdown(item)
    // console.log(dropdown)
})