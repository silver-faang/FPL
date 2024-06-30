class Calendar {
    constructor(elementId,day,month,year) {
        this.element = document.getElementById(elementId);
        this.currentMonth = month;
        this.currentYear = year;
        this.currentDay = day;
        this.renderCalendar();
    }

    daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    monthName(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }
    renderCalendar() {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const totalDays = this.daysInMonth(this.currentMonth, this.currentYear);
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        document.getElementById('monthYear').textContent = this.monthName(this.currentMonth) + ' ' + this.currentYear;
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });

        // Render the days of the this.currentMonth
        for (let i = 0; i < firstDay; i++) {
            const emptyDate = document.createElement('div');
            calendarGrid.appendChild(emptyDate);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('calendar-date');
            dateElement.textContent = day;
            if (day === date.getDate() && this.currentMonth === date.getMonth() && this.currentYear === date.getFullYear()){
                dateElement.classList.add('current-date');
            }

            dateElement.addEventListener('click', () => {
                console.log(date)
                date.setDate(day);
                date.setMonth(this.currentMonth);
                date.setFullYear(this.currentYear);
                this.renderCalendar();
            });
            calendarGrid.appendChild(dateElement);
        }
        document.getElementById('current-date').textContent = 'Selected date: ' + date.getDate() + ' ' + this.monthName(date.getMonth()) + ' ' + date.getFullYear();
    }
}
let date = new Date();
document.addEventListener('DOMContentLoaded', () => {
    let day = date.getDate();
    let month=date.getMonth();
    let year=date.getFullYear();
    let cal = new Calendar('calendar',day,month,year);
    cal.renderCalendar()

    // Event listeners for navigating to previous and next months
    document.getElementById('prevMonth').addEventListener('click', () => {
        cal.currentMonth -= 1;
        if (cal.currentMonth < 0) {
            cal.currentMonth = 11;
            cal.currentYear -= 1;
        }
        cal.renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        cal.currentMonth += 1;
        if (cal.currentMonth > 11) {
            cal.currentMonth = 0;
            cal.currentYear += 1;
        }
        cal.renderCalendar();
    });
});
