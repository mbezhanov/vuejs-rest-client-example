<template>
    <div id="menu">
        <div class="ui grid container">
            <div class="row">
                <div class="column">
                    <div class="ui inverted labeled icon menu">
                        <h1 class="header item">Food Tracker</h1>
                        <router-link to="/diary" class="item" active-class="active">
                            <i class="book icon"></i>
                            Diary
                        </router-link>
                        <router-link to="/foods" class="item" active-class="active">
                            <i class="food icon"></i>
                            Foods
                        </router-link>
                        <router-link to="/profile" class="item" active-class="active">
                            <i class="settings icon"></i>
                            Profile
                        </router-link>
                        <div class="right item">
                            <div class="middle aligned content">
                                <a href="#" class="ui inverted button" @click="onLogoutClicked">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        onLogoutClicked() {
            localStorage.removeItem('authToken');
            this.$store.commit('setIsAuthenticated', false);
        }
    }
}
</script>

<style scoped>
    #menu {
        background-color: #1B1C1D;
    }
    #menu .row {
        padding-bottom: 0 !important;
    }
</style>
