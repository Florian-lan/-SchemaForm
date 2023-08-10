<template>
  <div class="demo-preview">
    <div class="preview">
      <formRender
        v-if="!error"
        :schema="schema"
        :formData="formData"
        @on-change="change"
        @on-validate="validate"
      />
      <!-- :option="options" -->
      <div v-else>
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import formRender from '../packages/index.vue';

const schema2str = (obj) => JSON.stringify(obj, null, 2) || '';

export default {
  name: 'Index',
  components: {
    formRender,
  },
  props: {
    schemaProps: Object,
    formDataProps: Object,
  },
  data() {
    return {
      schema: this.schemaProps,
      formData: this.formDataProps || {},
      error: '',
      schemaStr: '',
    };
  },
  created() {
    this.schemaStr = schema2str(this.schema);
  },
  methods: {
    change(v) {
      console.log(v);
      this.formData = v;
      console.log('111');
      console.log(this.formData);

      // 触发自定义事件并将表单值发送到父组件
      // TODO 事件名待定
      this.$emit('form-data-changed', this.formData);
    },
    validate(v) {
      console.log('validate', v);
    },
    tryParse(schemaStr) {
      let schema = {};
      try {
        schema = parseJson(schemaStr);
        if (typeof schema !== 'object') {
          this.error = 'schema非正确json';
          return;
        }
        this.error = '';
        return schema;
      } catch (error) {
        this.error = String(error);
      }
      return '';
    },
  },
};
</script>
