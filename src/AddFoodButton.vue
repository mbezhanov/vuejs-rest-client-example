<template>
    <div>
        <p></p>
        <button id="add-food" class="ui olive fluid right labeled icon button">
            <i class="plus icon"></i>
            Add Food
        </button>
        <div class="ui modal">
            <i class="close icon"></i>
            <div class="header">
                Add Food
            </div>
            <div class="content">
                <form class="ui form">
                    <div class="field">
                        <div class="field">
                            <label>Meal</label>
                            <div class="ui selection dropdown">
                                <input type="hidden" name="gender">
                                <i class="dropdown icon"></i>
                                <div class="default text">Meal</div>
                                <div class="menu">
                                    <div class="item" data-value="1">Breakfast</div>
                                    <div class="item" data-value="2">Lunch</div>
                                    <div class="item" data-value="3">Dinner</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="field">
                            <label>Food</label>
                            <div class="ui selection dropdown">
                                <input type="hidden" name="gender">
                                <i class="dropdown icon"></i>
                                <div class="default text">Food</div>
                                <div class="menu">
                                    <div class="item" data-value="1">Apple</div>
                                    <div class="item" data-value="2">Orange</div>
                                    <div class="item" data-value="3">Blueberry</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label>Quantity</label>
                        <input type="text" name="quantity" placeholder="Quantity">
                    </div>
                    <button class="ui button" type="submit">Add</button>
                </form>
            </div>
        </div>
    </div>
</template>
