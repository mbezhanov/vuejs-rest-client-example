<template>
    <div class="ui calendar">
        <h2>Calendar</h2>
        <table class="ui celled center aligned unstackable olive table seven column day">
            <thead>
                <tr>
                    <th colspan="7">
                        <span class="link">{{ selectedCalendarDate.format('MMMM YYYY') }} </span>
                        <span class="prev link" @click="loadPreviousMonth"><i class="chevron left icon"></i></span>
                        <span class="next link" @click="loadNextMonth"><i class="chevron right icon"></i></span>
                    </th>
                </tr>
                <tr>
                    <th>S</th>
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>T</th>
                    <th>F</th>
                    <th>S</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="calendarRow in calendarDates">
                    <td v-for="calendarDate in calendarRow"
                        class="link"
                        :class="{
                            disabled: calendarDate.month() != selectedCalendarDate.month(),
                            today: calendarDate.isSame(today, 'day'),
                            range: loggedDates.indexOf(calendarDate.format('YYYY-MM-DD')) !== -1,
                            focus: calendarDate.isSame(selectedCalendarDate)
                        }"
                        :data-moment="calendarDate.format('YYYY-MM-DD')"
                        @click="handleDateClick"
                    >
                        {{ calendarDate.date() }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import chunk from 'lodash/chunk';
import moment from 'moment'
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            today: moment(),
            loggedDates: [],
            calendarDates: []
        }
    },
    computed: {
        ...mapGetters({
            selectedCalendarDate: 'getSelectedCalendarDate'
        })
    },
    methods: {
        renderCalendar(selectedDate) {
            this.$http.get(`diary/logged-dates/${selectedDate.year()}/${selectedDate.format('MM')}`).then(response => {
                const loggedDates = [];

                for (let item of response.body._embedded.items) {
                    loggedDates.push(moment(item.date).format('YYYY-MM-DD'));
                }
                this.loggedDates = loggedDates;
            });

            const rows = 6;
            const cols = 7;
            const firstDayOfThisMonth = moment(selectedDate).startOf('month');
            const lastDayOfThisMonth = moment(selectedDate).endOf('month');
            const daysFromPreviousMonth = firstDayOfThisMonth.day();
            const daysFromNextMonth = (rows * cols) - (selectedDate.daysInMonth() + daysFromPreviousMonth);

            let calendarDates = [];
            let currentDate = moment(firstDayOfThisMonth).subtract('1', 'days');

            for (let i = 0; i < daysFromPreviousMonth; i++) {
                calendarDates.unshift(currentDate);
                currentDate = moment(currentDate).subtract('1', 'days');
            }
            currentDate = moment(firstDayOfThisMonth);

            while (currentDate.diff(lastDayOfThisMonth, 'days') != 0) {
                calendarDates.push(currentDate);
                currentDate = moment(currentDate).add('1', 'days');
            }
            calendarDates.push(lastDayOfThisMonth);
            currentDate = moment(currentDate).add('1', 'days');

            for (let i = 0; i < daysFromNextMonth; i++) {
                calendarDates.push(currentDate);
                currentDate = moment(currentDate).add('1', 'days');
            }

            this.calendarDates = chunk(calendarDates, cols);
        },
        loadPreviousMonth() {
            this.$store.state.selectedCalendarDate = this.selectedCalendarDate.subtract(1, 'months');
            this.renderCalendar(this.selectedCalendarDate);
        },
        loadNextMonth() {
            this.$store.state.selectedCalendarDate = this.selectedCalendarDate.add(1, 'months');
            this.renderCalendar(this.selectedCalendarDate);
        },
        handleDateClick(e) {
            this.$store.state.selectedCalendarDate = moment(e.currentTarget.dataset.moment);
        }
    },
    created() {
        this.$store.state.selectedCalendarDate = moment(this.today);
        this.renderCalendar(this.today);
    }
}
</script>

<style scoped>
/*!
 * # Semantic UI 0.0.8 - Calendar
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

/*******************************
            Table
*******************************/

.ui.calendar .ui.table.year,
.ui.calendar .ui.table.month,
.ui.calendar .ui.table.minute {
    min-width: 15em;
}
.ui.calendar .ui.table.day {
    min-width: 18em;
}
.ui.calendar .ui.table.hour {
    min-width: 20em;
}
.ui.calendar .ui.table tr th,
.ui.calendar .ui.table tr td {
    padding: 0.5em;
    white-space: nowrap;
}
.ui.calendar .ui.table tr th {
    border-left: none;
}
.ui.calendar .ui.table tr th .icon {
    margin: 0;
}
.ui.calendar .ui.table tr th .icon {
    margin: 0;
}
.ui.calendar .ui.table tr:first-child th {
    position: relative;
    padding-left: 0;
    padding-right: 0;
}
.ui.calendar .ui.table.day tr:first-child th {
    border: none;
}
.ui.calendar .ui.table.day tr:nth-child(2) th {
    padding-top: 0.2em;
    padding-bottom: 0.3em;
}
.ui.calendar .ui.table tr td {
    padding-left: 0.1em;
    padding-right: 0.1em;
}
.ui.calendar .ui.table tr .link {
    cursor: pointer;
}
.ui.calendar .ui.table tr .prev.link {
    width: 14.28571429%;
    position: absolute;
    left: 0;
}
.ui.calendar .ui.table tr .next.link {
    width: 14.28571429%;
    position: absolute;
    right: 0;
}
.ui.calendar .ui.table tr .disabled {
    pointer-events: none;
    color: rgba(40, 40, 40, 0.3);
}

/*--------------
 States
---------------*/

.ui.calendar .ui.table tr td.today {
    font-weight: bold;
}
.ui.calendar .ui.table tr td.range {
    background: #ebfdd7;
    color: rgba(0, 0, 0, 0.95);
    box-shadow: none;
}
.ui.calendar .ui.table tr td.disabled.range {
    background: #fbfdef;
    color: rgba(40, 40, 40, 0.3);
    box-shadow: none;
}
.ui.calendar .ui.table tbody tr td.focus,
.ui.calendar .ui.table tbody tr td.focus {
    box-shadow: inset 0 0 0 1px #8abc1e;
}
</style>
