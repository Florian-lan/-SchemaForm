<template>
  <div class="form-item">
    <div class="form-item-title">
      <label :class="{ 'required-label': required }">
        {{ schema.title }}
      </label>
      <span :style="{ color: invalidText && '#ff4d4f' }">{{
        invalidText && invalidText
      }}</span>
    </div>
    <t-select :value="value" v-bind="options" multiple @change="handleChange">
      <t-option
        v-for="(item, index) in schema.enum"
        :key="index"
        :value="item"
        :label="item"
      >
        <!-- {{
          schema.enumNames
            ? schema.enumNames[index] || schema.enum[index]
            : schema.enum[index]
        }} -->
        {{ item }}
      </t-option>
    </t-select>
  </div>
</template>

<script>
export default {
  props: {
    schema: Object,
    formData: Object,
    name: String,
    onChange: Function,
    value: [String, Number, Boolean, Object,Array],
    disabled: Boolean,
    readOnly: Boolean,
    invalidText: String,
    options: Object,
    required: Boolean,
  },
  methods: {
    handleChange(v) {
      console.log('v', v);
      this.$emit('onChange', this.name, v);
    },
  },
};
</script>

<style scoped>
@import '../styles/common.less';
</style>
