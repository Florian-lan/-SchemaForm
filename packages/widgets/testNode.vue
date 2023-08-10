<template>
    <div>
        <a v-if="useUrl" target="_blank" :href="value">测试链接</a>
        <div v-else>测试链接</div>
    </div>
</template>
  
<script>
import { isUrl } from '../utils/utils';
export default {
    props: {
        value: String,
    },
    computed: {
        useUrl() {
            return isUrl(this.value);
        },
    },
};
</script>