"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FullList = /** @class */ (function () {
    function FullList(_list) {
        if (_list === void 0) { _list = []; }
        this._list = _list;
    }
    Object.defineProperty(FullList.prototype, "list", {
        get: function () {
            return this._list;
        },
        enumerable: false,
        configurable: true
    });
    FullList.prototype.load = function () {
        var storedList = localStorage.getItem("myList");
        if (!storedList)
            return;
        var parsedList = JSON.parse(storedList);
        this._list = parsedList.map(function (itemObj) { return ({
            id: itemObj.id,
            task: itemObj.task,
            completed: itemObj.completed,
            dueDate: new Date(itemObj.dueDate),
        }); });
    };
    FullList.prototype.save = function () {
        localStorage.setItem("myList", JSON.stringify(this._list));
    };
    FullList.prototype.clearList = function () {
        this._list = [];
        this.save();
    };
    FullList.prototype.addTodo = function (itemObj) {
        this._list.push(itemObj);
        this.save();
    };
    FullList.prototype.removeTodo = function (id) {
        this._list = this._list.filter(function (item) { return item.id !== id; });
        this.save();
    };
    FullList.prototype.completeTodo = function (id) {
        var todo = this._list.find(function (item) { return item.id === id; });
        if (todo) {
            todo.completed = true;
            this.save();
        }
    };
    FullList.prototype.listTodos = function () {
        return this._list;
    };
    FullList.prototype.filterTodos = function (completed) {
        return this._list.filter(function (todo) { return todo.completed === completed; });
    };
    FullList.prototype.updateTodo = function (id, newTask, newDueDate) {
        var todo = this._list.find(function (item) { return item.id === id; });
        if (todo) {
            todo.task = newTask;
            if (newDueDate) {
                todo.dueDate = newDueDate;
            }
            this.save();
        }
    };
    FullList.prototype.clearCompleted = function () {
        this._list = this._list.filter(function (todo) { return !todo.completed; });
        this.save();
    };
    FullList.instance = new FullList();
    return FullList;
}());
exports.default = FullList;
