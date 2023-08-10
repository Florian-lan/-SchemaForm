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
      <t-upload
        v-if="schema.action"
        :action="schema.action"
        @change="upload"
        show-upload-list="false"
        accept=".png,.gif,.jpg,.jpeg"
        name="filed"
        :data="{ action: 'fileUpload' }"
      >
        <t-button>
          <upload-outlined />
        </t-button>
      </t-upload>
      <t-input class="flex1" :value="value" type="text" @input="handleChange" />
      <t-popup>
        <template #content>
          <t-image :width="100" :src="value" />
        </template>
        <div>
          <t-button><FileImageIcon /></t-button>
        </div>
      </t-popup>
    </div>
  </div>
</template>

<script>
import '../styles/common.less';
import { MisIcon } from '@tencent/wxpay-mis-ui';

export default {
  components: {
    // FileImageIcon
    MisIcon,
  },
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
    handleChange(e) {
      this.$emit('onChange', this.name, e.target.value);
    },
    upload({ file }) {
      try {
        const imgSrc = file.response.data[0];
        this.$emit('onChange', this.name, imgSrc);
      } catch (e) {
        // ignore
      }
    },
  },
};
</script>
