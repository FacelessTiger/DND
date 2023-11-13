<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { Message, } from '../messages'
import { Client } from '../client'

export default defineComponent({
    props: {
        message: { type: Object as PropType<Message>, required:true },
        id: { type: Number as PropType<Number>, required:true }
    },
    mounted() {
      // @ts-ignore
      this.$refs.message.scrollIntoView({ behavior: 'smooth'});
    },
    methods: {
      onDelete() {
        
      }
    }
});
</script>

<template>
    <div ref="message" class="message">
        <span class="username-text" :style="{color: message.color}">
          {{ message.author }}:
        </span>
        <span class="message-text">
          {{ message.message }}
        </span>
    </div>
</template>

<style scoped>
.message-text {
  color: white;
}
.deleteButton {
  float: right;
  margin: 0.5%;
  height: 12px;
}
</style>