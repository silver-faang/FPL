import { TaskFilter } from "./components/task-filter";
import { TaskForm } from "./components/task-form";
import { TaskManager } from "./components/task-manager";

const taskManager = new TaskManager();
new TaskForm(taskManager);
new TaskFilter(taskManager);
