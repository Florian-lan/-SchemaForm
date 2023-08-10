<template>
  <div class="form-item">
    <div v-if="schema['ui:widget'] === 'switch'">
      <div class="form-item-title">
        <label :class="{ 'required-label': required }">
          {{ schema.title }}
        </label>
        <span :style="{ color: invalidText && '#ff4d4f' }">
          {{ invalidText && invalidText }}
        </span>
      </div>
      <!-- TODO 应该是监听change函数，待调整 -->
      <t-switch :checked="value" @onChange="handleChange" />
    </div>
    <t-radio v-else :checked="value" @change="handleChange"  allow-uncheck>
      <label :class="{ 'required-label': required }">
        {{ schema.title }}
      </label>
    </t-radio>
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
    value: [String, Number, Boolean, Object],
    disabled: Boolean,
    readOnly: Boolean,
    invalidText: String,
    required: Boolean,
  },
  methods: {
    handleChange(v) {
      console.log('boolean', v);
      this.$emit('onChange', this.name, v);
    },
  },
};
</script>
