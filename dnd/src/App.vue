<script lang="ts">
import { Client } from './client'
import ClientArea from './components/ClientArea.vue'
import LoginBox from './components/LoginBox.vue';
import { MessageBase } from './messages';

import { LoginRequestToken } from './events/LoginRequestToken';

export default {
  components: {
    ClientArea, LoginBox
  },
  mounted() {
    Client.Init();

    let token = localStorage.getItem("token");
    if (token)
    {
      let tokenInt = parseInt(token);

      Client.token = tokenInt;
      Client.send(new LoginRequestToken(tokenInt));
    }
  },
  data() {
    return {
      Client: Client
    }
  }
}
</script>

<template>
  <div class="app">
    <LoginBox v-if="Client.token == -1"/>
    <ClientArea v-else/>
  </div>
</template>

<style scoped>
* { padding: 0; margin: 0; height: 100% }
</style>