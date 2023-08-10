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
    <t-slider
      v-if="schema['ui:widget'] === 'slider'"
      v-bind="options"
      :value="value === '' ? 0 : parseInt(value)"
      :type="type"
      @change="handleChange"
      :max="max"
      :min="min"
    />
    <t-input-number
      v-else
      v-bind="options"
      :value="value"
      :type="type"
      :disabled="disabled || readOnly"
      @change="handleChange"
      :max="max"
      :min="min"
    />
  </div>
</template>

<script>
export default {
  props: {
    schema: Object,
    formData: Object,
    name: String,
    onChange: Function,
    value: [String, Number, Boolean, Object],
    disabled: Boolean,
    readOnly: Boolean,
    invalidText: String,
    required: Boolean,
  },
  computed: {
    type() {
      const { format = 'text' } = this.schema;
      return ['image', 'email'].indexOf(format) > -1 ? 'text' : format;
    },
    max() {
      return this.schema.max;
    },
    min() {
      return this.schema.min;
    },
    options() {
      return this.schema['ui:options'] || {};
    },
  },
  methods: {
    handleChange(v) {
      console.log(this.onChange);
      this.$emit('onChange', this.name, v);
    },
  },
};
</script>
