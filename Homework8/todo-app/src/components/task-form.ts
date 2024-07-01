import { TaskManager } from './task-manager';
import { Validator } from './Validator/validator';

export class TaskForm {
    private taskManager: TaskManager;
    validator = new Validator();
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
            <div id="error-message">
            </div>
            <button type="submit">Add Task</button>
        </form>
        `;

        document.getElementById('task-form')!.innerHTML = formHtml;
        document.getElementById('add-task-form')!.addEventListener('submit', this.handleAddTask.bind(this));
    }

    handleAddTask(event: Event) {
        event.preventDefault();
        const title = (document.getElementById('task-title') as HTMLInputElement).value.trim();
        const description = (document.getElementById('task-desc') as HTMLTextAreaElement).value.trim();
        const date = (document.getElementById('task-date') as HTMLInputElement).value;
        const priority = (document.getElementById('task-priority') as HTMLSelectElement).value;

        event.preventDefault();
    
        // Clear previous errors
        this.validator.clearErrors();
    
        if (!title) {
            this.validator.createError('title', 'Title is required.');
            this.validator.showError('title');
        }
        if (!description) {
            this.validator.createError('description', 'Description is required.');
            this.validator.showError('description');
        }
        if (!date) {
            this.validator.createError('date', 'Date is required.');
            this.validator.showError('date');
        }
        if (!priority) {
            this.validator.createError('priority', 'Priority is required.');
            this.validator.showError('priority');
        }
    
        // Show errors
        
    
        // If no errors, proceed to add task
        if (Object.keys(this.validator.errors).length === 0) {
        this.taskManager.addTask({
            title,
            description,
            date,
            priority,
            completed: false,
        });
        this.resetFormFields();
        }
    }
    resetFormFields() {
        (document.getElementById('task-title') as HTMLInputElement).value = '';
        (document.getElementById('task-desc') as HTMLTextAreaElement).value = '';
        (document.getElementById('task-priority') as HTMLSelectElement).value = '';
    }
}
