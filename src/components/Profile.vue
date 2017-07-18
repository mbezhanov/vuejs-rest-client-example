<template>
    <div class="row">
        <div class="sixteen wide column">
            <div class="ui active inverted dimmer" v-if="isLoading">
                <div class="ui text loader">Loading...</div>
            </div>
            <form class="ui form" @submit.prevent.stop="onFormSubmit">
                <transition name="fade" mode="out-in" appear>
                    <div class="ui info message" v-if="!hasError && !success" key="info">
                        <div class="header">Password Change</div>
                        <p>You can change your password using the form below.</p>
                    </div>
                    <div class="ui positive message" v-else-if="success" key="positive">Password updated successfully.</div>
                    <div class="ui negative message" v-else-if="hasError" key="negative">
                        <div class="header">{{ error.type | startCase }}</div>
                        <p>{{ error.title }}</p>
                    </div>
                </transition>
                <div class="field">
                    <label>Current Password</label>
                    <input type="password" v-model="currentPassword">
                </div>
                <div class="field">
                    <label>New Password</label>
                    <input type="password" v-model="newPassword">
                </div>
                <div class="field" :class="{ error: !arePasswordsMatching }">
                    <label>Confirm Password</label>
                    <input type="password" v-model="confirmPassword">
                </div>
                <button class="ui submit button" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import lodashStartCase from 'lodash/startCase';

export default {
    data() {
        return {
            success: false,
            error: null,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            isLoading: false
        }
    },
    computed: {
        hasError() {
            return this.error !== null;
        },
        arePasswordsMatching() {
            return (this.newPassword == this.confirmPassword) || (this.confirmPassword.length == 0);
        }
    },
    methods: {
        onFormSubmit() {
            if (!this.arePasswordsMatching) {
                return;
            }

            this.isLoading = true;

            const payload = {
                old_password: this.currentPassword,
                new_password: this.newPassword
            };

            this.$http.post('profile', payload).then(() => {
                this.success = true;
                this.error = null;
                this.isLoading = false;
            }, error => {
                this.success = false;
                this.error = error.body;
                this.isLoading = false;
            });
        }
    },
    filters: {
        startCase(value) {
            return lodashStartCase(value);
        }
    }
}
</script>
