// import Draggable from "vuedraggable";
// import * as XLSX from "xlsx";

import input from './input.vue';
import url from './url.vue';
import color from './color.vue';
import date from './date.vue';
import image from './image.vue';
import number from './number.vue';
import boolean from './boolean.vue';
import range from './range.vue';
import multiSelect from './multiSelect.vue';
import multiCheckbox from './multiCheckbox.vue';
import richText from './richText.vue';
import map from './map.vue'; // index循环生成，对应于原生的index
import array from './array.vue';

const mapping = {
  default: 'input',
  string: 'input',
  object: 'map',
  array: 'array',
  number: 'number',
  boolean: 'boolean',
  multiSelect: 'multiSelect',
  multiCheckbox: 'multiCheckbox',
  'range:dateTime': 'range',
  'string:email': 'input',
  'string:textarea': 'input',
  'string:url': 'url',
  'string:color': 'color',
  'string:image': 'image',
  'string:date': 'date',
  'string:richText': 'richText',
};

const widgets = {
  input,
  map,
  url,
  color,
  date,
  array,
  image,
  number,
  boolean,
  range,
  multiSelect,
  multiCheckbox,
  richText,
};

export { widgets, mapping };
