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
    <t-checkbox-group :value="value" @change="handleChange">
      <t-checkbox :checkAll="true" label="全选" />
      <t-checkbox
        v-for="(item, index) in schema.enum"
        :key="item"
        :value="item"
        :label="item"
      >
        <!-- {{
        //   schema.enumNames
        //     ? schema.enumNames[index] || schema.enum[index]
        //     : schema.enum[index]
        // }} -->
        {{ item }}
      </t-checkbox>
    </t-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    schema: Object,
    formData: Object,
    name: String,
    onChange: Function,
    value: [String, Number, Boolean, Object, Array],
    disabled: Boolean,
    readOnly: Boolean,
    invalidText: String,
    required: Boolean,
  },
  methods: {
    handleChange(v) {
      this.$emit('onChange', this.name, v);
    },
  },
};
</script>

<style scoped>
@import '../styles/common.less';
</style>
