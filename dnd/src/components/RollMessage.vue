<script lang="ts">
import { defineComponent } from 'vue'
import Popper from 'vue3-popper'
import type { PropType } from 'vue'

import { Roll, RollType } from '@/messages'

export default defineComponent({
    props: {
        roll: { type: Object as PropType<Roll>, required:true }
    },
    components: {
        Popper
    },
    mounted() {
      // @ts-ignore
      this.$refs.message.scrollIntoView({ behavior: 'smooth'});
    },
    data() {
        return {
            hover: [] as boolean[],
            RollType: RollType
        }
    }
});
</script>

<template>
    <div ref="message" class="top">
        <div class="author" :style="{ color: roll.color}">{{ roll.author }}:</div>
        <div class="main">
            <div class="header">{{ roll.header }}</div>
            <span v-for="(r, idx) of roll.rolls" @mouseenter="hover[idx] = true" @mouseleave="hover[idx] = false">
            <Popper :show="hover[idx]" class="theme">
                <slot class="test">{{ r.dice }}</slot>
                <template #content>
                    <span v-for="(resultRoll, index) of r.results">
                        <span v-if="r.type == RollType.Standard">{{ resultRoll }}<span v-if="index != r.results.length - 1">+</span></span>
                        <span v-if="r.type == RollType.AdvantageDisadvantage" :class="{ primaryRoll: index == r.primaryIndex }">{{ resultRoll }}<span v-if="index != r.results.length - 1" class="comma">, </span></span>
                    </span>
                </template>
            </Popper>{{ r.right }}
            </span>
            = {{ roll.total }}
        </div>
    </div>
</template>

<style scoped>
.top {
    height: 100%;
}
.author {
    height: 25%;
    margin: 0;
    padding: 0;
    position: relative;
    text-align: left;
}
.main {
    margin: 0.5%;
    color: white;
    height: 65%;
    width: 95%;
    left: 2.5%; 
    position: relative;

    background-color: black;
    text-align: center;
    font-size: 1rem;
}
.header {
    height: 40%;
    background-color: purple;
    font-size: 1em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.theme {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: white;
  --popper-theme-border-width: 10px;
  --popper-theme-border-radius: 1em;
  --popper-theme-padding: 1em;
}
.primaryRoll {
    color: red;
    font-weight: bold;
}
.comma {
    color: white;
    font-weight: normal;
}
</style>