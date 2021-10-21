import './form-elements.scss';

import {Dropdown} from '@blocks/dropdown/dropdown.js';
import {ExpandCheckbox} from '@blocks/expand-checkbox/expand-checkbox.js';
import {Like} from '@blocks/like/like.js';
import {Rate} from '@blocks/rate/rate.js';
import {Slider} from '@blocks/slider/slider.js';

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

document.querySelectorAll('.rate').forEach(function(item) {
    const rate = new Rate(item)
    // console.log(rate)
})


document.querySelectorAll('.slider').forEach(function(item) {
    const slider = new Slider(item)
    // console.log(slider)
})
