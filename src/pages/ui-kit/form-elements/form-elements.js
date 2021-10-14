import './form-elements.scss';

import {Dropdown} from '@blocks/dropdown/dropdown.js';
import {ExpandCheckbox} from '@blocks/expand-checkbox/expand-checkbox.js';
import {Like} from '@blocks/like/like.js';

document.querySelectorAll('.dropdown').forEach(function(item) {
    const dropdown = new Dropdown(item)
    // console.log(dropdown)
})

document.querySelectorAll('.expand-checkbox').forEach(function(item) {
    const expandCheckbox = new ExpandCheckbox(item)
    // console.log(expandCheckbox)
})

document.querySelectorAll('.like').forEach(function(item) {
    const like = new Like(item)
    // console.log(like)
})

