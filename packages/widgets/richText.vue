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
    <div ref="editor"></div>
  </div>
</template>

<script>
import WangEditor from 'wangeditor';
// import '../styles/common.less';

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
  data() {
    return {
      editor: null,
      instance: null,
    };
  },
  mounted() {
    this.instance = new WangEditor(this.$refs.editor);
    Object.assign(this.instance.config, {
      onchange: newHtml => {
        this.handleChange(newHtml);
      },
    });
    this.instance.config.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'foreColor',
      'backColor',
      'link',
      'list',
      'todo',
      'justify',
      'quote',
      'image',
      'video',
      'table',
      'code',
      'splitLine',
      'undo',
      'redo',
    ];
    this.instance.create();
    this.instance.txt.html(this.value);
  },
  beforeDestroy() {
    this.instance.destroy();
    this.instance = null;
  },
  methods: {
    handleChange(v) {
      this.$emit('onChange',this.name,v);
    },
  },
};
</script>

<style scoped>
@import '../styles/common.less';
</style>