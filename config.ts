import xpageConfig from '../xpage.config';
import initSchema from './schema.js';

export { xpageConfig };

export function getConfig() {
  return {
    name: xpageConfig.name,
    title: xpageConfig.title,
    icon: xpageConfig.icon,
    presetData: {
      defaultOptions: {
        schemaProps: initSchema,
        formDataProps: {},

        // renderOptions: `async function getRenderOptions() {
        //   return {
        //     data: [{
        //       schemaProps:{},
        //       formDataProps:{},
        //     }],
        //   }
        // }`,
      },
      style: {},
    },
    definition: {
      properties: {
        readme: {
          type: 'markdown',
          content: '',
        },
        rules: [],
      },
      events: [{}],
      methods: [],
    },
  };
}
