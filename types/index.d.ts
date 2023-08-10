export type JsonSchema = {
  $id?: string;
  $schema?: string;
  type?: string;
  properties?: {
    [key: string]: JsonSchema;
  };
  items?: JsonSchema | JsonSchema[];
  required?: string[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  enum?: any[];
  format?: string;
  default?: any;
  additionalProperties?: boolean | JsonSchema;

  // 自定义属性
  'ui:widget'?: string;
  'ui:options'?: {
    [key: string]: any;
  };
};
