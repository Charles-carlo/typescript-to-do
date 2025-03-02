import { TodoItem } from "./TodoItem";

interface List {
  list: TodoItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addTodo(itemObj: TodoItem): void;
  removeTodo(id: number): void;
  completeTodo(id: number): void;
  listTodos(): TodoItem[];
  filterTodos(completed: boolean): TodoItem[];
  updateTodo(id: number, newTask: string, newDueDate?: Date): void;
  clearCompleted(): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: TodoItem[] = []) {}

  get list(): TodoItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if (!storedList) return;

    const parsedList: { id: number; task: string; completed: boolean; dueDate: string }[] = JSON.parse(storedList);

    this._list = parsedList.map(
      (itemObj) => ({
        id: itemObj.id,
        task: itemObj.task,
        completed: itemObj.completed,
        dueDate: new Date(itemObj.dueDate),
      }) as TodoItem
    );
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addTodo(itemObj: TodoItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeTodo(id: number): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }

  completeTodo(id: number): void {
    const todo = this._list.find((item) => item.id === id);
    if (todo) {
      todo.completed = true;
      this.save();
    }
  }

  listTodos(): TodoItem[] {
    return this._list;
  }

  filterTodos(completed: boolean): TodoItem[] {
    return this._list.filter((todo) => todo.completed === completed);
  }

  updateTodo(id: number, newTask: string, newDueDate?: Date): void {
    const todo = this._list.find((item) => item.id === id);
    if (todo) {
      todo.task = newTask;
      if (newDueDate) {
        todo.dueDate = newDueDate;
      }
      this.save();
    }
  }

  clearCompleted(): void {
    this._list = this._list.filter((todo) => !todo.completed);
    this.save();
  }
}
