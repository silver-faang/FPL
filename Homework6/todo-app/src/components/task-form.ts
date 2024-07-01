import { TaskManager } from './task-manager';

export class TaskForm {
    private taskManager: TaskManager;

    constructor(taskManager: TaskManager) {
        this.taskManager = taskManager;
        this.render();
    }

    render() {
        const formHtml = `
        <h3 class="heading">Add Task</h3> 
        <form id="add-task-form">
            <input type="text" id="task-title" placeholder="Title" required>
            <select id="task-priority" placeholder="Priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <input type="date" id="task-date"><br />
            <textarea id="task-desc" placeholder="Description"></textarea><br/>
            <button type="submit">Add Task</button>
        </form>
        `;

        document.getElementById('task-form')!.innerHTML = formHtml;
        document.getElementById('add-task-form')!.addEventListener('submit', this.handleAddTask.bind(this));
    }

    handleAddTask(event: Event) {
        event.preventDefault();
        const title = (document.getElementById('task-title') as HTMLInputElement).value;
        const description = (document.getElementById('task-desc') as HTMLTextAreaElement).value;
        const date = (document.getElementById('task-date') as HTMLInputElement).value;
        const priority = (document.getElementById('task-priority') as HTMLSelectElement).value;

        this.taskManager.addTask({
            title,
            description,
            date,
            priority,
            completed: false,
        });
        this.resetFormFields();
    }
    resetFormFields() {
        (document.getElementById('task-title') as HTMLInputElement).value = '';
        (document.getElementById('task-desc') as HTMLTextAreaElement).value = '';
        (document.getElementById('task-priority') as HTMLSelectElement).value = '';
    }
}
