import { format, parseISO } from 'date-fns';

export function todoItem(name, description, dueDate, priority) {

    const updateTodo = (details) => {
        if (details.name) name = details.name;
        if (details.description) description = details.description;
        if (details.dueDate) dueDate = parseISO(details.dueDate);
        if (details.priority) priority = details.priority;
    };

    const getDateAsString = () => {
        if (!dueDate) return "No due date";
        return format(dueDate, "dd/MM/yyyy");
    };

    const getDateAsInputFormat = () => {
        if (!dueDate) return null;
        return format(dueDate, "yyyy-MM-dd");
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
        get dueDate() {
            return dueDate;
        },
        set dueDate(value) {
            dueDate = parseISO(value);
        },
        get priority() {
            return priority;
        },
        set priority(value) {
            priority = value;
        },
        get completed() {
            return completed;
        },
        set completed(value) {
            completed = value;
        },
        updateTodo,
        getDateAsString,
        getDateAsInputFormat
    };

}