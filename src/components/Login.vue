<template>
    <div id="login" class="ui middle aligned center aligned grid">
        <div class="login-column column">
            <h2 class="ui image header">
                <div class="content">
                    Log-in to your account
                </div>
            </h2>
            <div class="ui negative message" v-if="$store.state.authErrorMessage">{{ $store.state.authErrorMessage }}</div>
            <form class="ui large form">
                <div class="ui segment">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="email" placeholder="Username" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" placeholder="Password" v-model="password">
                        </div>
                    </div>
                    <div class="ui fluid large orange submit button" @click="onLoginButtonClick">Login</div>
                </div>
                <div class="ui negative message" v-if="error !== null">
                    <div class="header">{{ error.type | startCase }}</div>
                    <p>{{ error.title }}</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import lodashStartCase from 'lodash/startCase';

export default {
    data() {
        return {
            error: null,
            username: null,
            password: null
        }
    },
    methods: {
        onLoginButtonClick() {
            this.$http.post('login', {
                username: this.username,
                password: this.password
            }).then(response => {
                this.error = null;
                this.$emit('loggedIn', response.body.authToken);
            }, error => {
                this.error = error.body;
            });
        }
    },
    filters: {
        startCase(value) {
            return lodashStartCase(value);
        }
    },
}
</script>

<style scoped>
.login-column {
    width: 450px !important;
}
</style>
