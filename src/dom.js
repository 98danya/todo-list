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
                const newProject = projectItem(name, description);
                projects.push(newProject);

                storageManager.saveData(projects);

                renderProjects(projects);
            });
        });

        divContent.appendChild(addProjectButton);

    };


    const renderTodoForm = (onSubmit, todo = {}) => { 
        divContent.innerHTML = "";
    
        const form = document.createElement("form");
    
        const nameInput = document.createElement("input");
        nameInput.placeholder = "Todo Name";
        nameInput.required = true;
        nameInput.value = todo.name || ""; 
    
        const descriptionInput = document.createElement("input");
        descriptionInput.placeholder = "Description";
        descriptionInput.value = todo.description || "";
    
        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        dueDateInput.value = todo.dueDate || ""; 
    
        const prioritySelect = document.createElement("select"); 
        const priorityOptions = ["High", "Medium", "Low"];
        priorityOptions.forEach((priority) => {
            const option = document.createElement("option");
            option.value = priority;
            option.textContent = priority;
            if (todo.priority === priority) {
                option.selected = true; 
            }
            prioritySelect.appendChild(option);
        });
    
        const submitButton = document.createElement("button");
        submitButton.textContent = "Save Todo";
        submitButton.type = "submit";
    
        form.appendChild(nameInput);
        form.appendChild(descriptionInput);
        form.appendChild(dueDateInput);
        form.appendChild(prioritySelect);
        form.appendChild(submitButton);
    
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = nameInput.value.trim();
            const description = descriptionInput.value.trim();
            const dueDate = dueDateInput.value;
            const priority = prioritySelect.value;
    
            if (name) {
                onSubmit(name, description, dueDate, priority);
            }
        });
    
        divContent.appendChild(form);
    };


    const renderTodos = (todos, project, projects) => {
    divContent.innerHTML = `<h1>${project.name}</h1>`;
    
    todos.forEach((todo) => {
        const todoElement = document.createElement("div");
        todoElement.textContent = todo.name;
    
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            renderTodoForm(
                (name, description, dueDate, priority) => {
                    todo.updateTodo({
                        name,
                        description,
                        dueDate,
                        priority
                    });
        
                    storageManager.saveData(projects);                        
                    renderTodos(project.todoList, project, projects);
                },
                todo
            );
        });
    
        todoElement.appendChild(editButton);

        const deleteTodo = document.createElement("input");
        deleteTodo.type = "checkbox";
        deleteTodo.title = "Check to remove";
        deleteTodo.addEventListener("change", () => {
            if (deleteTodo.checked) {
                project.todoList.splice(project.todoList.indexOf(todo), 1);

                storageManager.saveData(projects);

                renderTodos(project.todoList, project, projects);
            }
        });

        todoElement.appendChild(deleteTodo);

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