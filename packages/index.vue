<template>
  <div class="vue-form-render">
    <field-component
      :is="Field"
      :schema="schema"
      :formData="data"
      :value="data"
      @onChange="handleChange"
      name="$form"
    />
    <!-- :onChange="handleChange" -->
  </div>
</template>

<script>
import { resolve, clone, getValidateList } from './utils/index';
import { widgets, mapping } from './widgets';
// import input from "./widgets/input.vue";

export default {
  props: {
    schema: Object, // 传入的json schema
    formData: Object, // 表单数据 props.formData
  },
  data() {
    return {
      data: resolve(this.schema, this.formData.value),
    };
  },
  computed: {
    Field() {
      return widgets[
        mapping[
          `${this.schema.type}${
            this.schema.format ? `:${this.schema.format}` : ''
          }`
        ]
      ];
    },
  },
  watch: {
    formData: {
      handler(newVal) {
        // console.log(newVal,newVal.value);
        // console.log(this.schema,newVal);
        this.data = resolve(this.schema, newVal);
        console.log(this.data);
        console.log('on-validate', getValidateList(this.data, this.schema));
        this.$emit('on-validate', getValidateList(this.data, this.schema));
      },
      deep: true,
    },
    schema: {
      handler(newVal) {
        console.log(newVal);
        this.data = resolve(newVal, this.formData);
        console.log(this.data);
        this.$emit('on-change', this.data);
      },
      deep: true,
    },
  },
  created() {
    if (!this.schema) return null;

    this.data = resolve(this.schema, this.formData);
    console.log('data', this.data);
    this.$emit('on-change', this.data);
  },
  methods: {
    handleChange(key, val) {
      console.log('这是index.vue');
      console.log(val);
      console.log(clone(val));
      this.$emit('on-change', clone(val));
      console.log(111111);

      console.log(clone(val));
    },
  },
};
</script>
