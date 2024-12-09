import { projectItem } from './project.js';

export const storageManager = (() => {
    const STORAGE_KEY = 'todoAppData'; 

    function saveData(data) {
        const dataToSave = data.map(project => ({
            name: project.name,
            description: project.description,
            todoList: project.todoList.map(todo => ({
                name: todo.name,
                description: todo.description,
                dueDate: todo.dueDate,
                priority: todo.priority,
            })),
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }

    function loadData() {
        const data = localStorage.getItem(STORAGE_KEY);
        try {
            if (!data) return [];

            const parsedData = JSON.parse(data);

            if (!Array.isArray(parsedData)) return [];

            const projects = parsedData.map(projectData => {
                const project = projectItem(projectData.name, projectData.description);

                if (Array.isArray(projectData.todoList)){
                    projectData.todoList.forEach(todoData => {
                        const todo = todoItem(todoData.name, todoData.description, todoData.dueDate, todoData.priority);
                        project.addTodo(todo);
                    });
                }
                return project;
            });

            return projects
            
        } catch (e) {
            console.error('Error parsing localStorage data:', e);
            return [];
        }
    }
    return {
        saveData,
        loadData,
    };
})();