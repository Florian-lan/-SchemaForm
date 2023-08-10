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
    <Select
      v-if="schema.enum"
      :schema="schema"
      :type="schema['ui:widget']"
      :value="value"
      v-bind="$props"
      @onChange="handleChange"
      :options="schema['ui:options']"
    />
    <t-textarea
      v-else-if="type === 'textarea'"
      v-bind="mergedConfig"
      :value="value"
      :type="type"
      @change="handleChange"
      :addonAfter="addonAfter"
    />
    <t-input-adornment
      v-else-if="type === 'url'"
      prepend="http://"
      append=".com"
    >
      <t-input
        v-bind="mergedConfig"
        :value="value"
        :type="type"
        @change="handleChange"
      />
    </t-input-adornment>
    <t-input
      v-else
      v-bind="mergedConfig"
      :value="value"
      :type="type"
      @change="handleChange"
    />
    <!-- :addonAfter="addonAfter"  -->
  </div>
</template>

<script>
import Select from './Select.vue';
// import TestNode from "./testNode.vue"; // TODO

export default {
  components: {
    Select,
    // TestNode,
  },
  props: {
    schema: Object,
    formData: Object,
    name: String,
    value: [String, Number, Boolean, Object],
    disabled: Boolean,
    readOnly: Boolean,
    onChange: Function,
    invalidText: String,
    required: Boolean,
  },

  // data() {
  //   return {
  //     val: this.value,
  //   };
  // },
  computed: {
    type() {
      const format = this.schema.format || 'text';
      return ['image', 'email'].indexOf(format) > -1 ? 'text' : format;
      // 为'url'时直接返回
    },
    config() {
      const maxLength = this.schema.maxLength;
      const options = this.schema['ui:options'] || {};

      const suffix = this.getSuffix(maxLength, options);
      // const addonAfter = this.getAddonAfter(options);

      return {
        ...options,
        maxLength,
        suffix,
      };
    },

    mergedConfig() {
      return {
        ...this.config,
        ...this.schema['ui:options'],
      };
    },
    addonAfter() {
      let addonAfter = this.schema['ui:options']?.addonAfter || null;
      // if (this.schema.format === "url" && !addonAfter) {
      //   addonAfter = <TestNode value={this.value} />;
      // }
      return addonAfter;
    },
  },
  mounted() {
    console.log('input', this.$props);
  },

  methods: {
    handleChange(v) {
      console.log(v);
      // debugger
      // this.$emit("onChange", this.name, v);
      this.$emit('onChange', this.name, v);
    },
    getSuffix(maxLength, options) {
      let suffix = undefined;
      try {
        let _value = this.value || '';
        if (typeof _value === 'number') {
          _value = String(_value);
        }
        suffix = options.suffix;
        if (!suffix && maxLength) {
          suffix = {
            fontSize: 12,
            color: _value.length > maxLength ? '#ff4d4f' : '#999',
          };
        }
      } catch (error) {
        // ignore
      }
      return suffix;
    },
  },
};
</script>
