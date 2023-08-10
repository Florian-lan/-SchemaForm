<template>
  <div>
    <multiSelect
      v-if="isMultiSelect"
      class="flex1"
      :value="value"
      :schema="schema"
      :name="name"
      :options="schema['ui:options']"
      @onChange="handleChange"
    />
    <!-- <div v-if="isMultiSelect" class="form-item">
      <div class="form-item-title">
        <label :class="{ 'required-label': required }">
          {{ schema.title }}
        </label>
        <span :style="{ color: invalidText && '#ff4d4f' }">
          {{ invalidText && invalidText }}
        </span>
      </div>
      <Select
        :schema="schema"
        :type="schema['ui:widget']"
        :value="value"
        :name="name"
        :options="schema['ui:options']"
        :multi="true"
        v-bind="$props"
        @onMultiChange="handleChange"
      />
    </div> -->
    <multiCheckbox
      v-else-if="hasEnum"
      class="flex1"
      :value="value"
      :schema="schema"
      :name="name"
      :options="schema['ui:options']"
      @onChange="handleChange"
    />
    <div v-else class="form-item object">
      <div v-if="schema.title" class="title">
        <label :class="{ 'required-label': required }">
          {{ schema.title }}
        </label>
        <span :style="{ color: invalidText && '#ff4d4f' }">{{
          invalidText && invalidText
        }}</span>
        <div class="flex align-center">
          <t-upload
            accept=".xlsx"
            :multiple="false"
            :showpload-list="false"
            :before-upload="parseExcel"
          >
            <span class="upload-excel">导入 excel</span>
          </t-upload>
          <span class="upload-excel" @click="exportExcel">下载 excel</span>
          <PlusOutlined
            v-if="!hasReachedMaxLength"
            @click="addItem"
          ></PlusOutlined>
        </div>
      </div>
      <div class="content">
        <draggable
          :model-value="value"
          class="list-group"
          handle=".handle"
          item-key="list-group"
          @update:model-value="handleDraggableUpdate"
        >
          <t-collapse>
            <t-collapse-panel v-for="(v, index) in value" :key="index">
              <template v-slot:header>
                <drag-outlined class="handle" />
              </template>
              <template v-if="!isMinLength" v-slot:extra>
                <DeleteOutlined @click="handleDelete(index)" />
              </template>
              <field
                class="flex1"
                :value="v"
                :schema="getSchema(index)"
                :name="`${index}`"
                @change="handleFieldChange(index)"
              />
            </t-collapse-panel>
          </t-collapse>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { Draggable } from 'vuedraggable';
import * as XLSX from 'xlsx';
import { widgets, mapping } from './index.js';
import multiSelect from './multiSelect.vue';
import multiCheckbox from './multiCheckbox.vue';
// import Select from './Select.vue';
import {
  getSubSchemas,
  resolve,
  clone,
  validate,
  convertValue,
} from '../utils';
const reader = new FileReader();
export default {
  components: {
    Draggable,
    multiSelect,
    multiCheckbox,
    // Select,
  },
  props: {
    schema: Object,
    formData: Object,
    value: [String, Number, Boolean, Object, Array],
    onChange: Function,
    name: String,
    invalidText: String,
    required: Boolean,
  },
  created() {
    console.log('create', this.value);
  },
  methods: {
    parseExcel(file) {
      const childrenSchemas = getSubSchemas(this.schema);
      reader.readAsArrayBuffer(file);
      // 第二步 监听读取完成后的回调
      reader.onload = function (e) {
        const data = e.target.result;
        const wb = XLSX.read(data, {
          type: 'array',
        });
        // 通过SheetNames[0]得到第一个sheet的名称
        const sheet1name = wb.SheetNames[0];
        // 取出第一个sheet
        const sheet1 = wb.Sheets[sheet1name];
        // 调用XLSX.utils.sheet_to_json方法将sheet转化为json;
        let value = [];
        const originValue = this.value[0]
          ? clone(this.value)[0]
          : resolve(childrenSchemas[0].schema);
        if (typeof originValue !== 'object') {
          value = XLSX.utils.sheet_to_json(sheet1, { header: 1 });
          value = value.map((v) => v[0]);
        } else {
          value = XLSX.utils.sheet_to_json(sheet1);
        }
        this.$emit('onChange', this.name, value);
      };

      return false;
    },
    exportExcel() {
      const childrenSchemas = getSubSchemas(this.schema);
      let data = this.value.length
        ? clone(this.value)
        : [resolve(childrenSchemas[0].schema)];
      if (typeof data[0] !== 'object') data = [data];
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws);
      XLSX.writeFile(wb, `${this.schema.title}.xlsx`);
    },
    getFieldComponent(index) {
      const schema =
        this.childrenSchemas[index]?.schema || this.childrenSchemas[0].schema;
      return (
        widgets[
          mapping[`${schema.type}${schema.format ? `:${schema.format}` : ''}`]
        ] || null
      );
    },
    isHidden(index) {
      const schema =
        this.childrenSchemas[index]?.schema || this.childrenSchemas[0].schema;
      return convertValue(schema['ui:hidden'], this.value[index], this.value);
    },
    getInvalidText(index) {
      const schema =
        this.childrenSchemas[index]?.schema || this.childrenSchemas[0].schema;
      return validate({
        name: index,
        schema,
        value: this.value[index],
        required: this.schema.required,
      });
    },
    getSchema(index) {
      return (
        this.childrenSchemas[index]?.schema || this.childrenSchemas[0].schema
      );
    },
    handleChange(index, val) {
      //   console.log('ssssssss', val, this.value, index);
      //   const newValue = [...this.value];
      //   newValue[index] = val;
      this.$emit('onChange', this.name, val);
    },
    updateValue(event) {
      const newValue = [...event];
      this.$emit('onChange', this.name, newValue);
    },
    addItem() {
      const newValue = [...this.value];
      newValue.push(newValue[0] || this.childrenSchemas[0].schema);
      this.$emit('onChange', this.name, newValue);
    },
    deleteItem(index) {
      const newValue = [...this.value];
      newValue.splice(index, 1);
      this.$emit('onChange', this.name, newValue);
    },
    handleDraggableUpdate(v) {
      const value = [...clone(v)];
      this.$emit('onChange', this.name, value);
    },
    handleFieldChange(index, key, val) {
      const value = [...this.value];
      value[key] = val;
      this.$emit('onChange', this.name, value);
    },
    handleDelete(index) {
      const value = clone(this.value);
      value.splice(index, 1);
      this.$emit('onChange', this.name, value);
    },
  },
  computed: {
    isMultiSelect() {
      return this.schema['ui:widget'] === 'multiSelect';
    },
    hasEnum() {
      return this.schema.enum;
    },
    hasReachedMaxLength() {
      return (
        this.schema.maxLength && this.schema.maxLength <= this.value.length
      );
    },
    childrenSchemas() {
      return getSubSchemas(this.schema);
    },
  },
};
</script>
