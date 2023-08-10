<template>
  <div class="form-item">
    <div class="form-item-title">
      <label :class="{'required-label':required}">
        {{ schema.title }}
      </label>
      <span :style="{ color: invalidText && '#ff4d4f' }">{{
        invalidText && invalidText
      }}</span>
    </div>
    <t-date-range-picker
      v-bind="options"
      :value="formatValue"
      @change="handleChange"
    />
  </div>
</template>

<script>
import moment from 'moment';
// import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

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
      return this.schema['ui:options'] || {};
    },
    formatValue(){
      if (!this.value) return [];
      // console.log("HHHHH")
      // console.log(this.value)
      const timeArr = this.value.dayjsValue;
      const startTime = timeArr[0] ? moment(timeArr[0], this.options.format) : '';
      const endTime = timeArr[1] ? moment(timeArr[1], this.options.format) : '';
      console.log(startTime,endTime)
      return [startTime, endTime];
    }
  },
  methods: {
    handleChange(moment, str) {
      console.log(str)
      this.$emit('onChange',this.name,str)
      // this.onChange(this.name, str);
    },
   
  },
};
</script>

<style scoped>
@import '../styles/common.less';
</style>