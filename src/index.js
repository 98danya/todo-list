import './styles.css';

import { projectItem } from "./project.js";
import { storageManager } from "./storageManager.js";
import { domController } from "./dom.js"
import { todoItem } from './todo';

let projects = storageManager.loadData() || [];

window.onload = () => {
    if (projects.length === 0) {
        const defaultProject = projectItem("Week 1", "Things that need to get done…");
        const todo1 = todoItem("Finish Application", "Finish the TODO-Application", "2024-12-10", "High");
        const todo2 = todoItem("Revision", "Revise Factory Functions ", "2024-12-28", "Medium");

        defaultProject.todoList.push(todo1);
        defaultProject.todoList.push(todo2);
        projects.push(defaultProject);

        storageManager.saveData(projects);
    }
    domController.renderProjects(projects, projects[0]);
};

window.addEventListener("beforeunload", () => {
    storageManager.saveData(projects); 
    localStorage.clear();
});

/*
let defaultProject = new projectItem("Week 1", "Things that need to get done…");
projects.push(defaultProject);

let todo1 = new todoItem("Finish Application", "Finish the TODO-Application", "2024/12/10", "High");
let todo2 = new todoItem("Revision", "Revise Factory Functions ", "2024/12/28", "Medium");

defaultProject.todoList.push(todo1);
defaultProject.todoList.push(todo2);
*/