<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { Error } from '@/messages'

export default defineComponent({
    props: {
        error: { type: Object as PropType<Error>, required:true }
    }
});
</script>

<template>
    <div class="top">
        Error: {{ error.errorMessage }}
    </div>
</template>

<style scoped>
.top {
    color: red;
    text-align: center;
}
</style>