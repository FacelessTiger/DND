<script lang="ts">
import { defineComponent } from 'vue'

import Chatbox from './Chatbox.vue';
import Canvas from './Canvas.vue';

export default defineComponent({
    components: {
        Chatbox, Canvas
    }
});
</script>

<template>
    <Chatbox/>
    <Canvas/>
</template>