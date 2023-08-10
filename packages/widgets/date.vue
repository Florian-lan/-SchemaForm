<template>
  <div class="form-item">
    <div class="form-item-title">
      <label :class="{'required-label':required}">
        {{ schema.title }}
      </label>
      <span :style="{ color: invalidText && '#ff4d4f' }">
        {{ invalidText && invalidText }}
      </span>
    </div>
    <t-date-picker v-bind="options"
                   :value="pickerValue"
                   :mode="mode"
                   @change="handleChange" />
  </div>
</template>

<script>
import moment from "moment";
import "../styles/common.less";

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
    required:Boolean
  },
  computed: {
    options() {
      return this.schema["ui:options"] || {};
    },
    mode() {
      return this.options.mode ? this.options.mode : "date";
    },
    pickerValue() {
      if (!this.value) return "";
      // console.log("HHHHH")
      console.log(this.value);
      const timeArr = this.value.dayjsValue;
      const v = timeArr ? moment(timeArr, this.options.format) : "";
      console.log(v);
      // return timeArr ? moment(timeArr, this.options.format) : "";
      return timeArr;
    },
  },
  methods: {
    handleChange(momentValue, str) {
      this.$emit("onChange", this.name, str);
    },
  },
};
</script>