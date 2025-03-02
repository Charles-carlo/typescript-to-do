import './css/style.css';
import FullList from './model/FullList';
import Todolist, { TodoItem } from './model/TodoItem'; 
import ListTemplate from './templates/listTemplate';

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault(); //

    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    if (!newEntryText.length) return;

    const itemId: number = fullList.list.length
      ? fullList.list[fullList.list.length - 1].id + 1
      : 1;

    const dueDate = new Date();
    const newItem: TodoItem = {
      id: itemId,
      task: newEntryText,
      completed: false,
      dueDate,
    };

    const clearCompleted = document.getElementById("clearCompletedButton") as HTMLButtonElement;
  clearCompleted.addEventListener('click', (): void => {
    fullList.clearCompleted();
    template.render(fullList);
  });

  const filterDropdown = document.getElementById("filterTasks") as HTMLSelectElement;
  filterDropdown.addEventListener("change", (event: Event) => {
    const filterValue = (event.target as HTMLSelectElement).value;

    let filteredTodos = fullList.list;

    if (filterValue === "completed") {
      filteredTodos = fullList.filterTodos(true);
    } else if (filterValue === "pending") {
      filteredTodos = fullList.filterTodos(false);
    }

    template.render({ list: filteredTodos } as FullList);
  });

    fullList.addTodo(newItem);
    template.render(fullList);
    input.value = "";
  });

  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;
  clearItems.addEventListener("click", (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
