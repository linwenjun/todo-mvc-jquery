(function ($) {
// livereload
    let nextId = 3;
    const initData = [
        {
            id: 1,
            completed: true,
            label: 'Taste JavaScript ！！！'
        },
        {
            id: 2,
            label: 'Buy a unicorn ！！！'
        }
    ]

    class TodoList {
        constructor(ele, opt) {
            const defaultSetting = {
                data: initData
            };

            const settings = Object.assign({}, defaultSetting, opt);
            this.$element = ele;
            this.settings = settings;

            this.regEvent()
        }

        regEvent() {
            const self = this;
            this.$element.on("click", ".toggle", function () {
                self.toggle(parseInt($(this).data('id'), 10))
                self.render()
            })

            this.$element.on("click", ".destroy", function () {
                self.destroy(parseInt($(this).data('id'), 10))
                self.render()
            })
        }

        toggle(id) {
            const item = this.settings.data.find((item) => (item.id === id))
            if (item) {
                item.completed = !item.completed
            }
        }

        toggleAll(checked) {
            this.settings.data = this.settings.data.map(item=> {
                return Object.assign({}, item, {completed: checked})
            })
            
            this.render()
        }

        destroy(id) {
            this.settings.data = this.settings.data.filter((item) => (item.id !== id))
        }

        add(label) {
            this.settings.data.push({
                label,
                id: nextId++
            })
            this.render()
        }

        render() {
            const data = this.settings.data.map((item) => {
                return Object.assign({
                    classStr: item.completed ? "completed" : "",
                    checked: item.completed
                }, item)
            })

            console.log(data);
            
            const html = $('#todoListItemTmpl').tmpl(data)
            this.$element.empty()
            this.$element.append($(html))

            this.$element.trigger('update', [this.settings.data]);
        }
    }

    const methods = {
        init: function (options) {
            let todoList = new TodoList(this, options);
            this.data('todoList', todoList);
            todoList.render()
        },
        add: function (label) {
            this.data('todoList').add(label)
        },
        toggleAll: function (checked) {
            this.data('todoList').toggleAll(checked)
         },
        update: function (content) { }
    };

    $.fn.todoList = function (methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tooltip');
        }
    };

})(jQuery)

