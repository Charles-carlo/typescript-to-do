"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListTemplate = /** @class */ (function () {
    function ListTemplate() {
        this.ul = document.getElementById("listItems");
    }
    ListTemplate.prototype.clear = function () {
        this.ul.innerHTML = '';
    };
    ListTemplate.prototype.render = function (fullList) {
        var _this = this;
        this.clear();
        fullList.list.forEach(function (item) {
            var li = document.createElement("li");
            li.className = "item";
            var check = document.createElement("input");
            check.type = "checkbox";
            // check.id = 1..toString()
            check.tabIndex = 0;
            check.checked = item.completed;
            li.append(check);
            check.addEventListener('change', function () {
                item.completed = !item.completed;
                fullList.save();
            });
            var label = document.createElement("label");
            // label.htmlFor = item.id
            label.textContent = item.task;
            li.append(label);
            var button = document.createElement("button");
            button.className = 'button';
            button.textContent = 'X';
            li.append(button);
            button.addEventListener('click', function () {
                fullList.removeTodo(item.id);
                _this.render(fullList);
            });
            _this.ul.append(li);
        });
    };
    ListTemplate.instance = new ListTemplate();
    return ListTemplate;
}());
exports.default = ListTemplate;
