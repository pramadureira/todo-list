function show_boxes() {
    todo = JSON.parse(localStorage.getItem('todos')) || []

    if (todo.length != 0) {
        let box_list = document.querySelector('section.box-list')
        box_list.innerHTML = ""
        for (var box_pos in todo) {
            let box = document.createElement('div')
            
            box.setAttribute("class", "box")
            let box_menu = document.createElement('div')
            box_menu.className = "box-menu"

            let buttons = `<button class="edit-box-button">
                                <img src="images/icon-pen.svg" alt="Add a task box">
                            </button>
                            <button class="del-box-button">
                                <img src="images/icon-close.svg" alt="Add a task box">
                            </button>`

            box_menu.innerHTML = `<h3>${todo[box_pos]}</h3>`
            box_menu.innerHTML += buttons
            box.appendChild(box_menu)
            box_list.appendChild(box)
        }
    }
}

function add_box() {
    todo = JSON.parse(localStorage.getItem('todos')) || []
    let box_name = document.getElementById('content')
    
    if (box_name.value.length == 0 || box_name.value.length >= 50) {
        box_name.value = ""
        box_name.focus()
        alert("Insira uma tarefa com pelo menos um símbolo e com menos de 50 símbolos")
    } else {
        todo.push(box_name.value)
        box_name.value = ""
        localStorage.setItem("todos", JSON.stringify(todo))
        show_boxes()
    }
}

show_boxes()
// Creates a new box if the button is pressed
document.getElementById('add-box-button').onclick = add_box

// Delete items
var list_del = document.querySelectorAll('.del-box-button')
for (var i=0; i<list_del.length; i++) {
    list_del[i].onclick = function(){
        todo = JSON.parse(localStorage.getItem('todos'))
        var box_to_del = this.parentNode.parentNode
        var box_name = box_to_del.querySelector("h3").innerHTML
        var index = todo.indexOf(box_name)
        if (index != -1) {
            todo.splice(index, 1)
            
            box_to_del.remove()
            localStorage.setItem("todos", JSON.stringify(todo))
            show_boxes()
        }
    }
}



