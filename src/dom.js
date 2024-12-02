import { projectItem } from "./project.js";
import { storageManager } from "./storageManager.js";
import { todoItem } from "./todo";

export const domController = (() => {
    const divContent = document.getElementById("content");

    divContent.innerHTML = "";

    const renderProjectForm = (onSubmit) => {
        const form = document.createElement("form");

        const nameInput = document.createElement("input");
        nameInput.placeholder = "Project Name";
        nameInput.required = true;

        const descriptionInput = document.createElement("input");
        descriptionInput.placeholder = "Description";

        const submitButton = document.createElement("button");
        submitButton.textContent = "Create Project";
        submitButton.type = "submit";

        form.appendChild(nameInput);
        form.appendChild(descriptionInput);
        form.appendChild(submitButton);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = nameInput.value.trim();
            const description = descriptionInput.value.trim();
            if (name) {
                onSubmit(name, description);
            }
        });

        divContent.appendChild(form);
    };

    const renderProjects = (projects) => {
        divContent.innerHTML = "";

        const header = document.createElement("h1");
        header.textContent = "Projects";
        divContent.appendChild(header);

        projects.forEach((project) => {
            const projectElement = document.createElement("div");
            projectElement.textContent = project.name;

            projectElement.addEventListener("click", () => {
                renderTodos(project.todoList, project, projects);
            });
            divContent.appendChild(projectElement);
        });

        const addProjectButton = document.createElement("button");
        addProjectButton.textContent = "Add New Project";
        addProjectButton.addEventListener("click", () => {
            renderProjectForm((name, description) => {
                console.log(`New project: ${name}, Description: ${description}`);

                const newProject = projectItem(name, description);
                projects.push(newProject);

                storageManager.saveData(projects);

                renderProjects(projects);
            });
        });

        divContent.appendChild(addProjectButton);

    };

    const renderTodoForm = (onSubmit) => {
        divContent.innerHTML = "";

        const form = document.createElement("form");

        const nameInput = document.createElement("input");
        nameInput.placeholder = "Todo Name";
        nameInput.required = true;

        const descriptionInput = document.createElement("input");
        descriptionInput.placeholder = "Description";

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";

        const priorityInput = document.createElement("input");
        priorityInput.type = "number";
        priorityInput.placeholder = "Priority (1-5)";
        priorityInput.min = 1;
        priorityInput.max = 5;

        const submitButton = document.createElement("button");
        submitButton.textContent = "Create Todo";
        submitButton.type = "submit";

        form.appendChild(nameInput);
        form.appendChild(descriptionInput);
        form.appendChild(dueDateInput);
        form.appendChild(priorityInput);
        form.appendChild(submitButton);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = nameInput.value.trim();
            const description = descriptionInput.value.trim();
            const dueDate = dueDateInput.value;
            const priority = parseInt(priorityInput.value, 10) || 1;
    
            if (name) {
                onSubmit(name, description, dueDate, priority);
            }

    });

    divContent.appendChild(form);
};

    const renderTodos = (todos, project, projects) => {
        divContent.innerHTML = `<h11>${project.name}</h1>`;

        todos.forEach((todo) => {
            const todoElement = document.createElement("div");
            todoElement.textContent = todo.name;

            todoElement.addEventListener("click", () => {
                renderTodo(todo);
            });
            divContent.appendChild(todoElement);
        });

        const addTodoButton = document.createElement("button");
        addTodoButton.textContent = "Add Todo";
        addTodoButton.addEventListener("click", () => {
            renderTodoForm((name, description, dueDate, priority) => {
                const newTodo = todoItem(name, description, dueDate, priority);
                project.addTodo(newTodo);
                storageManager.saveData(projects);
                renderTodos(project.todoList, project, projects);
            });
        });

        divContent.appendChild(addTodoButton);

        const backButton = document.createElement("button");
        backButton.textContent = "Back to Projects";
        backButton.addEventListener("click", () => {
            renderProjects(projects, () => {});
        });
        
        divContent.appendChild(backButton);

    };

    return {
        renderProjectForm,
        renderProjects,
        renderTodoForm,
        renderTodos
    };

})();