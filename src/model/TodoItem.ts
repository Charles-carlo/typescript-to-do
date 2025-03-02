export interface TodoItem {
    id: number;
    task: string;
    completed: boolean;
    dueDate: Date;
}

export default class Todolist {
    private _list: TodoItem[] = [];

    constructor() {}


    addTodo(task: string, dueDate: Date): void {
        const newTodo: TodoItem = {
            id: this._list.length + 1,
            task,
            completed: false,
            dueDate
        };
        this._list.push(newTodo);
    }


    completeTodo(id: number): void {
        const todo = this._list.find(item => item.id === id);
        if (todo) {
            todo.completed = true;
        }
    }


    removeTodo(id: number): void {
        this._list = this._list.filter(item => item.id !== id);
    }


    listTodos(): TodoItem[] {
        return this._list;
    }


    filterTodos(completed: boolean): TodoItem[] {
        return this._list.filter(todo => todo.completed === completed);
    }


    updateTask(id: number, newTask: string, newDueDate?: Date): void {
        const todo = this._list.find(item => item.id === id);
        if (todo) {
            todo.task = newTask;
            if (newDueDate) {
                todo.dueDate = newDueDate;
            }
        }
    }

    clearCompleted(): void {
        this._list = this._list.filter(todo => !todo.completed);
    }
}
