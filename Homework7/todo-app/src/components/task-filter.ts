import { TaskManager } from './task-manager';

export class TaskFilter {
    private taskManager: TaskManager;

    constructor(taskManager: TaskManager) {
        this.taskManager = taskManager;
        this.render();
    }

    render() {
        const filterHtml = `
        <h3 class="heading">Filter</h3> 
            <form id="filter-tasks-form">
                <input type="checkbox" id="show-completed"> Show Completed
                <input type="date" id="min-date">
                <input type="date" id="max-date"><br/>
                <input type="text" id="search-text" placeholder="Search"><br/>
                <button type="submit">Filter</button>
            </form>
        `;

        document.getElementById('task-filter')!.innerHTML = filterHtml;
        document.getElementById('filter-tasks-form')!.addEventListener('submit', this.handleFilterTasks.bind(this));
    }

    handleFilterTasks(event: Event) {
        event.preventDefault();
        const showCompleted = (document.getElementById('show-completed') as HTMLInputElement).checked;
        const searchText = (document.getElementById('search-text') as HTMLInputElement).value.toLowerCase();
        const minDate = (document.getElementById('min-date') as HTMLInputElement).value;
        const maxDate = (document.getElementById('max-date') as HTMLInputElement).value;

        this.taskManager.filterTasks({
            showCompleted,
            searchText,
            minDate,
            maxDate,
        });
    }
}
