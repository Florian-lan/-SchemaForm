<template>
  <Input
    :schema="schema"
    :formData="formData"
    :name="name"
    @onChange="handleChange"
    :value="value"
    :disabled="disabled"
    :readOnly="readOnly"
    :invalidText="invalidText"
  />
  <!-- <t-input
    v-bind="mergedConfig"
    :value="value"
    :type="type"
    @change="handleChange"
  /> -->
</template>

<script>
import Input from './input.vue';

export default {
  components: {
    Input,
  },
  props: {
    schema: Object,
    formData: Object,
    name: String,
    onChange: Function,
    value: [String, Number, Boolean, Object],
    disabled: Boolean,
    readOnly: Boolean,
    invalidText: String,
  },
  watch: {
    invalidText: {
      handler(newVal, oldVal) {
        console.log('url-watch', newVal, oldVal);
      },
      immediate: true,
    },
  },
  methods: {
    handleChange(n, v) {
      this.$emit('onChange', this.name, v);
    },
  },
};
</script>
