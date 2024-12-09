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

  const renderProjects = (projects, selectedProject = null) => {
    divContent.innerHTML = "";

    const projectContainer = document.createElement("nav");
    projectContainer.classList.add("project-container");

    const header = document.createElement("h1");
    header.textContent = "🖇️ Projects";
    projectContainer.appendChild(header);

    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+";
    addProjectButton.addEventListener("click", () => {
      renderProjectForm((name, description) => {
        const newProject = projectItem(name, description);
        projects.push(newProject);

        storageManager.saveData(projects);

        renderProjects(projects, newProject);
      });
    });

    projectContainer.appendChild(addProjectButton);

    projects.forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project-element");
      projectElement.textContent = project.name;

      projectElement.addEventListener("click", () => {
        renderProjects(projects, project);
      });

      projectContainer.appendChild(projectElement);
    });

    if (selectedProject) {
      renderTodos(selectedProject.todoList, selectedProject, projects);
    }

    divContent.appendChild(projectContainer);
  };

  const renderTodoForm = (onSubmit, todo = {}, projects, project) => {
    const formContainer = document.createElement("div");
    formContainer.classList.add("todo-form-container");

    const form = document.createElement("form");

    const nameInput = document.createElement("input");
    nameInput.placeholder = "Todo Name";
    nameInput.required = true;
    nameInput.value = todo && todo.name ? todo.name : "";

    const descriptionInput = document.createElement("input");
    descriptionInput.placeholder = "Description";
    descriptionInput.value = todo && todo.description ? todo.description : "";

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.value = todo && todo.dueDate ? todo.dueDate : "";

    const prioritySelect = document.createElement("select");
    const priorityOptions = ["High", "Medium", "Low"];
    const priority = todo && todo.priority ? todo.priority : "High";

    priorityOptions.forEach((priorityOption) => {
      const option = document.createElement("option");
      option.value = priorityOption;
      option.textContent = priorityOption;
      if (priority === priorityOption) {
        option.selected = true;
      }
      prioritySelect.appendChild(option);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Save Todo";
    submitButton.type = "submit";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.type = "button";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const description = descriptionInput.value.trim();
      const dueDate = dueDateInput.value;
      const priority = prioritySelect.value;

      if (name) {
        onSubmit(name, description, dueDate, priority);
        renderTodos(project.todoList, project, projects);
      }
      formContainer.remove();
    });

    cancelButton.addEventListener("click", () => {
      formContainer.remove();
    });

    form.appendChild(nameInput);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateInput);
    form.appendChild(prioritySelect);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    formContainer.appendChild(form);
    divContent.appendChild(formContainer);
  };

  const renderTodos = (todos, project, projects) => {
    let todosContainer = document.querySelector(".todo-container");

    if (!todosContainer) {
      todosContainer = document.createElement("div");
      todosContainer.classList.add("todo-container");
      divContent.appendChild(todosContainer);
    }

    todosContainer.innerHTML = `<h2>${project.name} <br> <h3>${project.description}</h3></h2>`;

    todos.forEach((todo) => {
      const todoElement = document.createElement("div");
      todoElement.classList.add("todo-element");

      const todoName = document.createElement("h4");
      todoName.textContent = todo.name;
      todoElement.appendChild(todoName);

      const todoDescription = document.createElement("p");
      todoDescription.textContent = `${todo.description}`;
      todoElement.appendChild(todoDescription);

      const todoDueDate = document.createElement("p");
      todoDueDate.textContent = `Due Date: ${todo.dueDate}`;
      todoElement.appendChild(todoDueDate);

      const todoPriority = document.createElement("p");
      todoPriority.textContent = `Priority: ${todo.priority}`;
      todoElement.appendChild(todoPriority);

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        renderTodoForm(
          (name, description, dueDate, priority) => {
            todo.updateTodo({
              name,
              description,
              dueDate,
              priority,
            });

            storageManager.saveData(projects);
            renderTodos(project.todoList, project, projects);
          },
          todo,
          projects,
          project
        );
      });

      todoElement.appendChild(editButton);

      const deleteTodo = document.createElement("input");
      deleteTodo.type = "checkbox";
      deleteTodo.title = "Check to remove";
      deleteTodo.addEventListener("change", () => {
        if (deleteTodo.checked) {
          const index = project.todoList.indexOf(todo);
          if (index !== -1) {
            project.todoList.splice(index, 1);
          }

          storageManager.saveData(projects);

          renderTodos(project.todoList, project, projects);
        }
      });

      todoElement.appendChild(deleteTodo);

      todosContainer.appendChild(todoElement);
    });

    const addTodoButton = document.createElement("button");
    addTodoButton.textContent = "Add Todo";
    addTodoButton.addEventListener("click", () => {
      renderTodoForm(
        (name, description, dueDate, priority) => {
          const newTodo = todoItem(name, description, dueDate, priority);
          project.addTodo(newTodo);
          storageManager.saveData(projects);
          renderTodos(project.todoList, project, projects);
        },
        null,
        projects,
        project
      );
    });

    todosContainer.appendChild(addTodoButton);

    divContent.appendChild(todosContainer);
  };

  return {
    renderProjectForm,
    renderProjects,
    renderTodoForm,
    renderTodos,
  };
})();
