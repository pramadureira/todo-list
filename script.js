var box_list = document.querySelector('section.box-list')
var box_name = document.getElementById('content')

function create_box(box_name) {
    var box = document.createElement('div')
    box.setAttribute("class", "box")
    
    var box_menu = document.createElement('div')
    box_menu.className = "box-menu"

    var buttons = `<button class="edit-box-button">
                        <img src="images/icon-pen.svg" alt="Add a task box">
                    </button>
                    <button class="del-box-button">
                        <img src="images/icon-close.svg" alt="Add a task box">
                    </button>`

    box_menu.innerHTML = `<h3>${box_name}</h3>`
    box_menu.innerHTML += buttons
    box.appendChild(box_menu)

    return box
}

function get_data() {
    return (JSON.parse(localStorage.getItem('todos')) || [])
}

function update_data(todo) {
    localStorage.setItem("todos", JSON.stringify(todo))
}

function show_boxes() {
    var todo = get_data()

    if (todo.length != 0) {
        box_list.innerHTML = ""
        for (var box_pos in todo) {
            let box = create_box(todo[box_pos])
            box_list.appendChild(box)
        }
    }

    check()
}

function add_box() {
    todo = get_data()
    
    if (box_name.value.length == 0 || box_name.value.length >= 50) {
        box_name.focus()
        alert("Insira uma tarefa com pelo menos um símbolo e com menos de 50 símbolos")
    } else {
        todo.push(box_name.value)
        update_data(todo)

        show_boxes()
    }
    box_name.value = ""
}

function del_box() {
    todo = get_data()
    var box_to_del = this.parentNode.parentNode
    var box_name = box_to_del.querySelector("h3").innerHTML
    var index = todo.indexOf(box_name)
    if (index != -1) {
        todo.splice(index, 1)
        box_to_del.remove()

        update_data(todo)
    }
}

function check() {
    var del_box_button_list = document.querySelectorAll('.del-box-button')
    for (var i=0; i<del_box_button_list.length; i++) {
        del_box_button_list[i].addEventListener("click", del_box)
    }
}


show_boxes()


// Creates a new box if either the button or "Enter" is pressed
document.getElementById('add-box-button').onclick = add_box
document.getElementById('content').addEventListener("keypress", function (event) {
    if(event.key === "Enter") {
        add_box()
    }
})