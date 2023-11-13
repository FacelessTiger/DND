<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { PropType, Ref } from 'vue'

import ChatMessage from './ChatMessage.vue'
import RollMessage from './RollMessage.vue'
import ErrorMessage from './ErrorMessage.vue'
import * as Messages from '@/messages'

import { Client } from '../client'
import * as Events from "@/events"

export default defineComponent({
  components: {
    ChatMessage, RollMessage, ErrorMessage
  },
  mounted() {
    let localStorageUsername = localStorage.getItem("username");
    this.username = (localStorageUsername == null) ? "FacelessTiger" : localStorageUsername;

    let localStorageColor = localStorage.getItem("color");
    this.color = (localStorageColor == null) ? "#FF0000" : localStorageColor;
  },
  data() {
    return {
      message: "",
      username: "FacelessTiger",
      color: "#FF0000",

      MessageType: Messages.MessageType,
      Client: Client
    }
  },
  methods: {
    onEnter() {
      if (!this.message) return;

      this.sendMessage(this.message);
      this.message = "";
    },
    sendMessage(message: string)
    {
      console.log("sent here!");
      Client.send(new Events.Message(new Messages.Message(message, this.username, this.color)));
    }
  },
  watch: {
    username() {
      localStorage.setItem("username", this.username);
    },
    color() {
      localStorage.setItem("color", this.color);
    }
  }
})
</script>

<template>
  <div class="top">
    <div class="textbox">
      <div v-for="(msg, id) in Client.messages" :class="{ rollMessage: (msg.type == MessageType.Roll), errorMessage: (msg.type == MessageType.Error) }">
        <ChatMessage v-if="msg.type == MessageType.Message"
        :message="(msg as Messages.Message)"
        :id="id"
        />
        <RollMessage v-else-if="msg.type == MessageType.Roll" class="rollMessageContainer"
        :roll="(msg as Messages.Roll)"/>
        <ErrorMessage v-else-if="msg.type == MessageType.Error" class="errorMessageContainer"
        :error="(msg as Messages.Error)"/>
      </div>
    </div>
    <input class="message-input" v-model="message" v-on:keyup.enter="onEnter" placeholder="send message" />
    <input class="username-input" v-model="username" placeholder="enter username" />
    <input class="color" type="color" v-model="color">
  </div>
</template>

<style scoped>
.top {
  height: 100%;
  width: 25%;
  float: right;
}
.message-input::placeholder, .username-input::placeholder, .username-input {
  text-align: center;
  color: rgb(170, 170, 170);
}
.message-input, .username-input {
  background-color: rgb(100, 100, 100);
  color: white;
}
.textbox {
  height: 90%;
  width: 96%;

  margin: 0.5%;
  font-size: 1rem;
  overflow-y: auto;
  word-wrap: break-word;
  border-style: solid;
}
.message-input {
  height: 2.5%;
  width: 95%;
}
.username-input {
  height: 2.5%;
  width: 45%;
  position: relative;
}
.color {
  width: 50%;
  top: 0.25%;
  position: relative;
}
.rollMessage {
  width: 100%;
  height: 8%;
  position: relative;
}
.rollMessageContainer {
  width: 100%;
  height: 100%;
  position: relative;
}
.errorMessage {
  width: 100%;
  height: 5%;
  position: relative;
}
.errorMessageContainer {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>