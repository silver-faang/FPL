export interface Task {
    title: string;
    description: string;
    date: string;
    priority: string;
    completed: boolean;
}

export class TaskManager {
    constructor(){
        this.loadTasks();
        this.renderTasks();
    }
    private tasks: Task[] = [];
    addTask(task: Task) {
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    filterTasks(filters: { showCompleted: boolean; searchText: string; minDate: string; maxDate: string; }) {
        let filteredTasks = this.tasks;

        if (filters.showCompleted) {
            filteredTasks = filteredTasks.filter(task => task.completed);
        }

        if (filters.searchText) {
            filteredTasks = filteredTasks.filter(task =>
                task.title.toLowerCase().includes(filters.searchText) ||
                task.description.toLowerCase().includes(filters.searchText)
            );
        }

        if (filters.minDate) {
            filteredTasks = filteredTasks.filter(task => task.date >= filters.minDate);
        }

        if (filters.maxDate) {
            filteredTasks = filteredTasks.filter(task => task.date <= filters.maxDate);
        }

        this.renderTasks(filteredTasks);
    }

    sortTasks(column: string) {
        this.tasks.sort((a:any, b:any) => {
            if (a[column] < b[column]) return -1;
            if (a[column] > b[column]) return 1;
            return 0;
        });
        this.renderTasks();
    }

    updateTask(updatedTask: Task) {
        this.tasks = this.tasks.map(task => (task.title === updatedTask.title ? updatedTask : task));
        this.saveTasks();
        this.renderTasks();
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    private loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }
    }

    private renderTasks(tasks: Task[] = this.tasks) {
        const taskListElement = document.querySelector('#task-list');
        taskListElement!.innerHTML = '';
    
        const table = document.createElement('table');
        table.id = 'task-table'
        table.innerHTML = `
            <thead>
                <tr>
                <th data-column="done">Done</th>
                <th data-column="title">Title</th>
                <th data-column="priority">Priority</th>
                <th data-column="date">Date</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
    
        const tbody = table.querySelector('tbody')!;
        
        tasks.forEach(task => {
            const row = document.createElement('tr');
    
            const completedCell = document.createElement('td');
            const completedCheckbox = document.createElement('input');
            completedCheckbox.type = 'checkbox';
            completedCheckbox.checked = task.completed;
            completedCheckbox.addEventListener('change', () => {
                task.completed = completedCheckbox.checked;
                this.updateTask(task);
            });
            completedCell.appendChild(completedCheckbox);
            row.appendChild(completedCell);
    
            const titleCell = document.createElement('td');
            titleCell.textContent = task.title;
            row.appendChild(titleCell);
    
            const priorityCell = document.createElement('td');
            priorityCell.textContent = task.priority;
            row.appendChild(priorityCell);
    
            const dateCell = document.createElement('td');
            dateCell.textContent = task.date;
            row.appendChild(dateCell);
    
            // const actionsCell = document.createElement('td');
            // const deleteButton = document.createElement('button');
            // deleteButton.textContent = 'Delete';
            // deleteButton.addEventListener('click', () => {
            //     this.deleteTask(task);
            // });
            // actionsCell.appendChild(deleteButton);
            // row.appendChild(actionsCell);
    
            tbody.appendChild(row);
        });
    
        taskListElement!.appendChild(table);
        this.addSortEventListeners();
    }
    addSortEventListeners() {
        document.querySelectorAll('#task-table thead tr th').forEach(th => {
            th.addEventListener('click', () => {
                const column = th.getAttribute('data-column')!;
                this.sortTasks(column);
                this.renderTasks();
            });
        });
    }
    
}
