import { todoItem } from './todo.js';

export function projectItem(title ) {
    return {
        title,
        todos: [],
        addTodo(todo) {
            this.todos.push(todo);
        },
        listTodos() {
            return this.todos;
        },
    };

}