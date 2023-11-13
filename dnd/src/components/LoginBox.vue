<script lang="ts">
import { defineComponent } from 'vue';

import { Client } from '../client'
import * as Events from "@/events"

export default defineComponent({
    data() {
        return {
            username: "",
            password: "",
            passwordConfirm: "",
            loggingIn: true,
            rememberMe: false,

            errorMessage: ""
        }
    },
    methods: {
        onLogin() {
            if (!this.isUsernameValid()) return;
            if (!this.isPasswordValid()) return;

            Client.send(new Events.LoginRequest(this.username, this.password, this.rememberMe));
        },
        onCreateAccount() {
            if (!this.isUsernameValid())
            {
                this.errorMessage = "Enter a valid username (must be 6 or more characters long)";
                return;
            }

            if (!this.isPasswordValid())
            {
                this.errorMessage = "Enter a valid password (must be 6 or more characters long)";
                return;
            }

            if (this.password != this.passwordConfirm)
            {
                this.errorMessage = "Passwords must match!";
                return;
            }

            this.errorMessage = "";
            Client.send(new Events.CreateAccountRequest(this.username, this.password));
        },
        isPasswordValid() {
            return this.password.length >= 6;
        },
        isUsernameValid() {
            return this.username.length >= 6;
        }
    }
});
</script>

<template>
    <div class="top">
        <div v-if="loggingIn">
            <input class="username-input" v-model="username" placeholder="Username">
            <br>
            <input class="password-input" type="password" v-model="password" placeholder="Password">
            <br>

            <button @click="onLogin()">Login</button>
            <button @click="loggingIn = false">Create Account</button>
            <div class="remember-me">
                <input type="checkbox" v-model="rememberMe">Remember me
            </div>
        </div>
        <div v-else>
            <input class="username-input" :class="{ inputError: (!isUsernameValid()) }" v-model="username" placeholder="Username">
            <br>
            <input class="password-input" :class="{ inputError: (!isPasswordValid()) }" type="password" v-model="password" placeholder="Password">
            <br>
            <input class="password-input" :class="{ inputError: (password != passwordConfirm) }" type="password" v-model="passwordConfirm" placeholder="Confirm password">
            <br>

            <button @click="onCreateAccount()">Create</button>
            <button @click="loggingIn = true; errorMessage = ''">Back to Login</button>
            <br>
            <b class="error-message">{{ errorMessage }}</b>
        </div>
    </div>
</template>

<style scoped>
.username-input::placeholder, .password-input::placeholder, .email-input::placeholder {
    color: rgb(170, 170, 170);
}

.inputError {
    border: 2px solid red;
    border-radius: 4px;
}

.error-message {
    color: red
}

.remember-me {
    color: white;
}
</style>