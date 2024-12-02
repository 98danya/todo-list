import { todoItem } from './todo.js';

export function projectItem(name, description ) {
    let selected = false;
    const todoList = [];

    const addTodo = (todo) => {
        if (!todo) {
            console.error("Invalid todo item");
            return;
        }
        todoList.push(todo);
        return {
            name,
            description,
            todoList,
            addTodo,
        };
    };

    const removeTodo = (todo) => {
        const index = todoList.indexOf(todo);
        if (index > -1) {
            todoList.splice(index, 1);
            console.log(`Todo "${todo.title}" removed from project "${name}"`);
        } else {
            console.error("Todo not found in project");
        }
    };

    const updateProject = (details) => {
        if (details.name) name = details.name;
        if (details.description) description = details.description;

        console.log(`Project "${name}" updated`);
    };

    return {
        get name() {
            return name;
        },
        set name(value) {
            name = value;
        },
        get description() {
            return description;
        },
        set description(value) {
            description = value;
        },
        get todoList() {
            return todoList; 
        },
        get selected() {
            return selected;
        },
        set selected(value) {
            selected = value;
        },
        addTodo,
        removeTodo,
        updateProject,
    };
}