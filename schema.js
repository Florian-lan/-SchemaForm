const initSchema = {
  type: 'object',
  properties: {
    AllString: {
      title: 'string类',
      type: 'object',
      properties: {
        input: {
          title: '简单输入框',
          type: 'string',
          'ui:options': {
            placeholder: '昵称',
          },
        },
        textarea: {
          title: '简单文本编辑框',
          type: 'string',
          format: 'textarea',
        },
        color: {
          title: '颜色选择',
          type: 'string',
          format: 'color',
        },
        date: {
          title: '日期选择',
          type: 'string',
          format: 'date',
        },
        url: {
          title: 'URL',
          type: 'string',
          format: 'url',
        },
      },
      required: ['input'],
    },
    allNumber: {
      title: 'number类',
      type: 'object',
      properties: {
        number1: {
          title: '数字输入框',
          description: '1 - 1000',
          type: 'number',
          min: 1,
          max: 1000,
        },
        number2: {
          title: '带滑动条',
          type: 'number',
          'ui:widget': 'slider',
        },
      },
    },
    allBoolean: {
      title: 'boolean类',
      type: 'object',
      properties: {
        radio: {
          title: '是否通过',
          type: 'boolean',
        },
        switch: {
          title: '开关控制',
          type: 'boolean',
          'ui:widget': 'switch',
        },
      },
    },
    allRange: {
      title: 'range类',
      type: 'object',
      properties: {
        dateRange: {
          title: '日期范围',
          type: 'range',
          format: 'dateTime',
          'ui:options': {
            placeholder: ['开始时间', '结束时间'],
          },
        },
      },
    },
    allEnum: {
      title: '选择类',
      type: 'object',
      properties: {
        select: {
          title: '单选',
          type: 'string',
          enum: ['早', '中', '晚'],
          'ui:options': {
            placeholder: '请选择预计时间',
          },
        },
        radio: {
          title: '单选',
          type: 'string',
          enum: ['早', '中', '晚'],
          'ui:widget': 'radio',
        },
        multi: {
          title: '多选',
          description: '下拉多选',
          type: 'array',
          items: {
            type: 'string',
          },
          enum: ['杭州', '武汉', '湖州', '贵阳'],
          'ui:widget': 'multiSelect',
        },
        boxes: {
          title: '多选',
          description: 'checkbox',
          type: 'array',
          items: {
            type: 'string',
          },
          enum: ['杭州', '武汉', '湖州', '贵阳'],
        },
      },
    },
  },
};

export default initSchema;
