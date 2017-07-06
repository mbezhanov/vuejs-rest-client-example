<template>
    <div id="menu">
        <div class="ui grid container">
            <div class="row">
                <div class="column">
                    <div class="ui inverted labeled icon menu">
                        <h1 class="header item">Food Tracker</h1>
                        <a class="item active">
                            <i class="book icon"></i>
                            Diary
                        </a>
                        <a class="item">
                            <i class="food icon"></i>
                            Foods
                        </a>
                        <a class="item">
                            <i class="settings icon"></i>
                            Profile
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #menu {
        background-color: #1B1C1D;
    }
    #menu .row {
        padding-bottom: 0 !important;
    }
</style>
