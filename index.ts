// 只导出组件即可
import CustomComponent from './components/index.vue';
import config from '../xpage.config';

// @ts-ignore
CustomComponent.install = Vue => {
  Vue.component(config.name, CustomComponent);
};

export default CustomComponent;
