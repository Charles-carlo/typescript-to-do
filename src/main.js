"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/style.css");
var FullList_1 = require("./model/FullList");
var listTemplate_1 = require("./templates/listTemplate");
var initApp = function () {
    var fullList = FullList_1.default.instance;
    var template = listTemplate_1.default.instance;
    var itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", function (event) {
        event.preventDefault(); //
        var input = document.getElementById("newItem");
        var newEntryText = input.value.trim();
        if (!newEntryText.length)
            return;
        var itemId = fullList.list.length
            ? fullList.list[fullList.list.length - 1].id + 1
            : 1;
        var dueDate = new Date();
        var newItem = {
            id: itemId,
            task: newEntryText,
            completed: false,
            dueDate: dueDate,
        };
        var clearCompleted = document.getElementById("clearCompletedButton");
        clearCompleted.addEventListener('click', function () {
            fullList.clearCompleted();
            template.render(fullList);
        });
        var filterDropdown = document.getElementById("filterTasks");
        filterDropdown.addEventListener("change", function (event) {
            var filterValue = event.target.value;
            var filteredTodos = fullList.list;
            if (filterValue === "completed") {
                filteredTodos = fullList.filterTodos(true);
            }
            else if (filterValue === "pending") {
                filteredTodos = fullList.filterTodos(false);
            }
            template.render({ list: filteredTodos });
        });
        fullList.addTodo(newItem);
        template.render(fullList);
        input.value = "";
    });
    var clearItems = document.getElementById("clearItemsButton");
    clearItems.addEventListener("click", function () {
        fullList.clearList();
        template.clear();
    });
    fullList.load();
    template.render(fullList);
};
document.addEventListener("DOMContentLoaded", initApp);
