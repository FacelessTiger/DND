<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    mounted() {
        let canvas = this.$refs.glcanvas as HTMLCanvasElement;
        let gl = canvas.getContext("webgl");

        canvas.width = window.innerWidth * 0.74;
        canvas.height = window.innerHeight * 0.99;

        window.addEventListener('resize',  (e) => {
            canvas.width = window.innerWidth * 0.74;
            canvas.height = window.innerHeight * 0.99;
        });

        if (gl === null) 
        {
            alert("Unable to initalize WebGL. Your browser or machine may not support it.");
            return;
        }

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
});
</script>

<template>
    <canvas ref="glcanvas" width="640" height="480"></canvas>
</template>