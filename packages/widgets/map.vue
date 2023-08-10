<template>
  <div class="form-item object">
    <div v-if="schema.title" class="title">
      <label>
        {{ schema.title }}
      </label>
    </div>
    <div class="content">
      <template v-for="(name, index) in Object.keys(value)">
        <component
          :is="getFieldComponent(index)"
          v-if="!isHidden(index)"
          :invalidText="getInvalidText(index, name)"
          :value="value[name]"
          :schema="getSchema(index)"
          :name="name"
          :key="name"
          :required="isRequired(name)"
          @onChange="handleChange"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { getSubSchemas, convertValue, validate } from '../utils';
import { widgets, mapping } from './index.js';

export default {
  props: {
    schema: Object,
    formData: Object,
    value: [String, Number, Boolean, Object],
    onChange: Function,
    name: String,
  },

  computed: {
    childrenSchemas() {
      return getSubSchemas(this.schema);
    },
    required() {
      return this.schema['required'];
    },
  },
  created() {
    console.log('value', this.value);
  },
  methods: {
    getFieldComponent(index) {
      console.log('children', this.childrenSchemas);
      const schema = this.childrenSchemas[index].schema;
      return (
        widgets[
          mapping[`${schema.type}${schema.format ? `:${schema.format}` : ''}`]
        ] || null
      );
    },
    isHidden(index) {
      const schema = this.childrenSchemas[index].schema;
      return convertValue(schema['ui:hidden'], this.value[name], this.value);
    },
    isRequired(name) {
      console.log('name', name);
      if (!this.required) return false;
      return this.required.indexOf(name) > -1 ? true : false;
    },
    getInvalidText(index, name) {
      const schema = this.childrenSchemas[index]?.schema;
      console.log('validate', name, schema, this.value);
      console.log(
        'res',
        validate({
          name,
          schema,
          value: this.value[name],
          required: this.schema.required,
        })
      );
      // 获取验证提示信息
      return validate({
        name,
        schema,
        value: this.value[name],
        required: this.schema.required,
      });
    },
    getSchema(index) {
      return this.childrenSchemas[index].schema;
    },
    handleChange(key, val) {
      console.log(key, val);
      const value = {
        ...this.value,
        [key]: val,
      };
      // console.log(this.childrenSchemas);
      console.log('我是');
      // console.log(this.onChange);
      console.log(value);
      this.$emit('onChange', this.name, value);
      // this.onChange(this.name, value);
    },
  },
};
</script>
