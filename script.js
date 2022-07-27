const boxList = document.querySelector('section.box-list')
const boxName = document.getElementById('content')

function createBox(boxName) {
    let box = document.createElement('div')
    box.setAttribute("class", "box")
    
    let boxMenu = document.createElement('div')
    boxMenu.className = "box-menu"

    let buttons = `<button class="edit-box-button">
                        <img src="images/icon-pen.svg" alt="Add a task box">
                    </button>
                    <button class="del-box-button">
                        <img src="images/icon-close.svg" alt="Add a task box">
                    </button>`

    boxMenu.innerHTML = `<h3>${boxName}</h3>`
    boxMenu.innerHTML += buttons
    box.appendChild(boxMenu)

    return box
}

function getData() {
    return (JSON.parse(localStorage.getItem('todos')) || [])
}

function updateData(todo) {
    localStorage.setItem("todos", JSON.stringify(todo))
}

function displayBoxes() {
    let todo = getData()

    if (todo.length != 0) {
        boxList.innerHTML = ""
        for (var boxPos in todo) {
            let box = createBox(todo[boxPos])
            boxList.appendChild(box)
        }
    }

    check()
}

function addBox() {
    let todo = getData()
    
    if (boxName.value.length == 0 || boxName.value.length >= 50) {
        boxName.focus()
        alert("Insira uma tarefa com pelo menos um símbolo e com menos de 50 símbolos")
    } else {
        todo.push(boxName.value)
        updateData(todo)

        displayBoxes()
    }
    boxName.value = ""
}

function delBox() {
    let todo = getData()
    let boxToDel = this.parentNode.parentNode
    let boxName = boxToDel.querySelector("h3").innerHTML
    let index = todo.indexOf(boxName)
    if (index != -1) {
        todo.splice(index, 1)
        boxToDel.remove()

        updateData(todo)
    }
}

function editBox() {
    alert('Editing!')
}

function check() {
    let delBoxButtonList = document.querySelectorAll('.del-box-button')
    for (let i=0; i < delBoxButtonList.length; i++) {
        delBoxButtonList[i].addEventListener("click", delBox)
    }

    let editBoxButtonList = document.querySelectorAll('.edit-box-button')
    for (let i=0; i < editBoxButtonList.length; i++) {
        editBoxButtonList[i].addEventListener("click", editBox)
    }
}


displayBoxes()


// Creates a new box if either the button or "Enter" is pressed
document.getElementById('add-box-button').addEventListener("click", addBox)
document.getElementById('content').addEventListener("keypress", function (event) {
    if(event.key === "Enter") {
        addBox()
    }
})