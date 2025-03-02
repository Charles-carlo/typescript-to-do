"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Todolist = /** @class */ (function () {
    function Todolist() {
        this._list = [];
    }
    Todolist.prototype.addTodo = function (task, dueDate) {
        var newTodo = {
            id: this._list.length + 1,
            task: task,
            completed: false,
            dueDate: dueDate
        };
        this._list.push(newTodo);
    };
    Todolist.prototype.completeTodo = function (id) {
        var todo = this._list.find(function (item) { return item.id === id; });
        if (todo) {
            todo.completed = true;
        }
    };
    Todolist.prototype.removeTodo = function (id) {
        this._list = this._list.filter(function (item) { return item.id !== id; });
    };
    Todolist.prototype.listTodos = function () {
        return this._list;
    };
    Todolist.prototype.filterTodos = function (completed) {
        return this._list.filter(function (todo) { return todo.completed === completed; });
    };
    Todolist.prototype.updateTask = function (id, newTask, newDueDate) {
        var todo = this._list.find(function (item) { return item.id === id; });
        if (todo) {
            todo.task = newTask;
            if (newDueDate) {
                todo.dueDate = newDueDate;
            }
        }
    };
    Todolist.prototype.clearCompleted = function () {
        this._list = this._list.filter(function (todo) { return !todo.completed; });
    };
    return Todolist;
}());
exports.default = Todolist;
