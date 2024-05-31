// Create a function drawCalendar , which gets two parameters - year, month and returns a string with real calendar month for the year, example (use template strings ``, spaces and symbol "\n" to beautify view):

function drawCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    let startingDay = firstDayOfMonth.getDay();

    let calendar = `${year} / ${month}\nSun Mon Tue Wed Thu Fri Sat\n`;
    calendar += " ".repeat(startingDay * 4);
    for (let day = 1; day <= daysInMonth; day++) {
        calendar += `${day < 10 ? "  " : " "}${day} `;
        if ((day + startingDay) % 7 === 0) {
            calendar += "\n";
        }
    }
    return calendar;
}
console.log(drawCalendar(2024, 6));
