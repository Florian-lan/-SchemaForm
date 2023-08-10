<template>
  <div>
    <!-- 单选radio -->
    <t-radio-group
      v-if="type === 'radio'"
      v-bind="options"
      name="radioGroup"
      @change="handleChange"
      :value="value"
    >
      <t-radio v-for="(item, index) in schema.enum" :key="index" :value="item">
        <!-- {{
          schema.enumNames
            ? schema.enumNames[index] || schema.enum[index]
            : schema.enum[index]
        }} -->
        {{ item }}
      </t-radio>
    </t-radio-group>
    <!-- 单选select或多选select -->
    <t-select
      v-else
      :value="value"
      v-bind="selectAttributes"
      @change="handleChange"
    >
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
    value: [String, Number, Boolean, Object],
    props: Object,
    type: String,
    options: Object,
    multi: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selectAttributes() {
      const multi = this.multi ? { multiple: true } : {};
      console.log('multi', multi);
      return {
        ...this.options,
        ...multi,
      };
    },
  },
  created() {
    console.log('select schema', this.schema);
    console.log('options', this.value);
  },
  methods: {
    handleChange(v, e) {
      console.log('select', e, v);
      // debugger
      // this.$emit("onChange", this.name, v);
      if (this.multi) {
        console.log('ssssssss');
        this.$emit('onMultiChange', v);
      } else {
        this.$emit('onChange', v);
      }
    },
  },
};
</script>
