import './styles.css';

import { projectItem } from "./project.js";
import { storageManager } from "./storageManager.js";
import { domController } from "./dom.js"

let projects = storageManager.loadData() || [];

window.onload = () => {
    domController.renderProjects(projects, (name, description) => {
        const newProject = projectItem(name, description);
        projects.push(newProject); 
        storageManager.saveData(projects); 
        domController.renderProjects(projects, () => {}); 
    });
};

window.addEventListener("beforeunload", () => {
    storageManager.saveData(projects); 
    localStorage.clear();
});