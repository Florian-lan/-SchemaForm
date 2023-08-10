<template>
  <div class="form-item">
    <div class="form-item-title">
      <label :class="{ 'required-label': required }">
        {{ schema.title }}
      </label>
      <span :style="{ color: invalidText && '#ff4d4f' }">
        {{ invalidText && invalidText }}
      </span>
    </div>
    <div class="flex align-center">
      <!-- <t-input
        :style="{ width: '50px', height: '32px', padding: 0 }"
        :value="value"
        type="color"
        @change="handleChange"
      />
      <t-input
        @change="handleChange"
        class="flex1"
        :value="value"
        type="text"
      /> -->
      <t-color-picker :value="value" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import '../styles/common.less';

export default {
  props: {
    schema: Object,
    formData: Object,
    name: String,
    onChange: Function,
    value: {
      type: [String, Number, Boolean, Object],
      default: '#07C160',
    },
    disabled: Boolean,
    readOnly: Boolean,
    invalidText: String,
    required: Boolean,
  },
  methods: {
    handleChange(v, e) {
      console.log(e, v);
      this.$emit('onChange', this.name, v);
    },
  },
};
</script>
