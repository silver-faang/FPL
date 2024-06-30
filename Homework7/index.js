class Calendar {
    constructor(elementId,day,month,year) {
        this.element = document.getElementById(elementId);
        this.inputCell = document.getElementById('cell');
        this.notesCell = document.getElementById('notes');
        this.notes = JSON.parse(localStorage.getItem('calendarNotes')) || {};
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

        // Render the days of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDate = document.createElement('div');
            calendarGrid.appendChild(emptyDate);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('calendar-date');
            dateElement.textContent = day;
            if (day === this.currentDay) {// && month === this.currentMonth && year === this.currentYear
                dateElement.classList.add('current-date');
            }

            dateElement.addEventListener('click', () => {
                // this.currentMonth = month;
                // this.currentYear = year;
                this.currentDay = day;
                this.renderCalendar();
                this.addInputField(day,this.currentMonth,this.currentYear)
            });
            calendarGrid.appendChild(dateElement);
            if (this.notes[day]) {
                this.notes[day].forEach(note => this.displayNote(day, note));
            }
        }
        document.getElementById('current-date').textContent = 'Selected date: ' + this.currentDay + ' ' + this.monthName(this.currentMonth) + ' ' + this.currentYear;
        
    }
    addInputField(date,month,year) {
        this.inputCell.innerText=''
        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';

        const input = document.createElement('input');
        input.type = 'text';

        const saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.addEventListener('click', () => {
            this.saveNote(date+"/"+month+"/"+year, input.value);
            inputContainer.remove();
        });

        inputContainer.appendChild(input);
        inputContainer.appendChild(saveButton);
        this.inputCell.appendChild(inputContainer);
    }

    saveNote(date, note) {
        if (!this.notes[date]) {
            this.notes[date] = [];
        }
        this.notes[date].push(note);
        localStorage.setItem('calendarNotes', JSON.stringify(this.notes));
        this.displayNote(date, note);
    }

    displayNote(date, note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerText = note +"("+date+")";

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'x';
        deleteButton.addEventListener('click', () => this.deleteNote(date, note, noteDiv));

        noteDiv.appendChild(deleteButton);
        this.notesCell.appendChild(noteDiv);
    }

    deleteNote(date, note, noteDiv) {
        this.notes[date] = this.notes[date].filter(n => n !== note);
        if (this.notes[date].length === 0) {
            delete this.notes[date];
        }
        localStorage.setItem('calendarNotes', JSON.stringify(this.notes));
        noteDiv.remove();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let date = new Date();
    let day = date.getDay();
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
