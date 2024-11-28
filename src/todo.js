import { format, parseISO } from 'date-fns';

export function todoItem(title, description, dueDate, priority) {
    return {
        title,
        description,
        dueDate: parseISO(dueDate),
        priority,
        markComplete() {
            console.log(`Todo "${this.title}" marked as complete`);
        },
    };

}