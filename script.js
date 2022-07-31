const boxList = document.querySelector('section.box-list')
const boxName = document.getElementById('content')
const openBox = document.querySelector('.wrapper')
const openBoxName = document.getElementById('box-content')

function isOnTasks(task, listTask) {
    let flattenTasks = listTask.flat()
    return (flattenTasks.indexOf(task) != -1)
}

function createBox(boxName) {
    let box = document.createElement('div')
    box.setAttribute("class", "box")

    let boxButtonsMenu = document.createElement('div')
    boxButtonsMenu.className = "box-buttons-menu"
    
    let boxMenu = document.createElement('div')
    boxMenu.className = "box-menu"
    let buttons = `<button class="edit-box-button">
                        <img src="images/icon-pen.svg" alt="Edit a task box">
                    </button>
                    <button class="del-box-button">
                        <img src="images/icon-close.svg" alt="Delete a task box">
                    </button>`

    boxButtonsMenu.innerHTML = buttons
    boxMenu.innerHTML = `<h3>${boxName}</h3>`
    boxMenu.appendChild(boxButtonsMenu)
    box.appendChild(boxMenu)
    box.innerHTML += `<ul></ul>`

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
            let box = createBox(todo[boxPos][0].substring(5))
            for (let i = 1; i < todo[boxPos].length; i++) {
                let item = `<li class="item">
                            <input type="checkbox" name="" id=""><label>${todo[boxPos][i][0].substring(5)}</label></li>`
                        
                box.querySelector('ul').innerHTML += item
            }
            boxList.appendChild(box)
        }
    }

    checkBoxes()
}

function addBox() {
    let todo = getData()
    if (boxName.value.length == 0 || boxName.value.length >= 50 || todo.flat().indexOf(`<sub>${boxName.value}`) != -1) {
        boxName.focus()
        alert("Insira uma tarefa com pelo menos um símbolo e com menos de 50 símbolos e que não esteja já em baixo.")
    } else {
        todo.push([`<sub>${boxName.value}`])
        updateData(todo)

        displayBoxes()
    }
    boxName.value = ""
}

function delBox() {
    let todo = getData()
    let boxToDel = this.parentNode.parentNode
    let boxName = boxToDel.querySelector("h3").innerHTML
    let index = todo.indexOf(`<sub>${boxName}`)
    for (let pos in todo) {
        if (todo[pos][0] === `<sub>${boxName}`) {
            todo.splice(pos,1)
            boxToDel.remove()
            updateData(todo)
            displayBoxes()
            break
        }
    }
}

function editBox() {
    displayBox(this.parentNode.parentNode)
}

function checkBoxes() {
    let delBoxButtonList = document.querySelectorAll('.del-box-button')
    for (let i=0; i < delBoxButtonList.length; i++) {
        delBoxButtonList[i].addEventListener("click", delBox)
    }

    let editBoxButtonList = document.querySelectorAll('.edit-box-button')
    for (let i=0; i < editBoxButtonList.length; i++) {
        editBoxButtonList[i].addEventListener("click", editBox)
    }
}

// For individual boxes:
function displayBox(boxToEdit) {
    todo = getData()
    openBox.style.display = 'block'
    openBox.querySelector('ul').innerHTML = ""
    document.querySelector('body').style.overflow = 'hidden'
    openBox.querySelector('h3.box-name').innerHTML = `${boxToEdit.querySelector("h3").innerHTML}`
    for (let pos = 0; pos < todo.length; pos++) {
        if (todo[pos][0] === `<sub>${boxToEdit.querySelector("h3").innerHTML}`) {
            todo = todo[pos].flat()
            break
        }
    }

    for (let p = 1; p < todo.length; p++) {
        let item = document.createElement('li')
        item.className = "item"
        item.innerHTML = `<input type="checkbox" name="" id="" class="open-box-name"><label>${todo[p].substring(5)}</label>`
        let menu = document.createElement('div')
        menu.className = "task-menu"
        
        let buttons = `<button class="add-subtask-button">
                            <img src="images/icon-plus2.svg" alt="Add a subtask to a box">
                        </button>
                        <button class="del-task-button">
                            <img src="images/icon-close.svg" alt="Delete a task from a box">
                        </button>`
        
    
        menu.innerHTML += buttons
        item.appendChild(menu)
        openBox.querySelector('ul').appendChild(item)
    }

    checkBox()
}

function addTasktoList(content) {
    let todo = getData()
    content[0] = `<sub>${content[0]}`
    for (let pos = 1; pos < content.length; pos++) {
        if (pos < 10) {
            content[pos] = `<s0${pos}>${content[pos]}`
        } else {
            content[pos] = `<s${pos}>${content[pos]}`
        }
    }
    aux = todo
    for (let pos = 0; pos < content.length; pos++) {
        if (!isOnTasks(content[pos], aux)) {
            aux.push([content[pos]])
        }

        for (let i = 0; i < todo.length; i++) {
            if (aux[i][0] === content[pos]) {
                aux = aux[i]
                break
            }
        }
    }
    updateData(todo)
}

function delTaskList(content) {
    let todo = getData()
    content[0] = `<sub>${content[0]}`
    for (let pos = 1; pos < content.length; pos++) {
        if (pos < 10) {
            content[pos] = `<s0${pos}>${content[pos]}`
        } else {
            content[pos] = `<s${pos}>${content[pos]}`
        }
    }
    let aux1 = todo

    for (let pos = 0; pos < content.length; pos++) {
        if (pos != content.length - 1) {
            for (let i = 0; i < aux1.length; i++) {
                if (aux1[i][0] == content[pos]) {
                    aux1 = aux1[i]
                    break
                }
            }
        } else {
            for (let i = 0; i < aux1.length; i++) {
                if (aux1[i][0] == content[pos]) {
                    p = i
                    break
                }
            }
            aux1.splice(p, 1)
        }
    }
    updateData(todo)
}

function addTask(box, boxToEdit) {
    if (openBoxName.value.length == 0 || openBoxName.value.length >= 50) {
        openBoxName.focus()
        alert("erro aqui")
    } else {
        addTasktoList([box, openBoxName.value])
        displayBoxes()
        displayBox(boxToEdit)
    }
    openBoxName.value = ""
}

function delTask(boxToEdit) {
    delTaskList([boxToEdit.parentNode.parentNode.querySelector("h3").innerHTML,boxToEdit.querySelector('label').innerHTML])
    displayBoxes()
    displayBox(boxToEdit.parentNode.parentNode)
}

function addSubTask(boxToEdit) {
    alert('Soon...')
}

function checkBox() {
    let delTaskButtonList = document.querySelectorAll('.del-task-button')
    for (let i=0; i < delTaskButtonList.length; i++) {
        delTaskButtonList[i].addEventListener("click", function (event) {
        delTask(event.target.parentNode.parentNode.parentNode)
        })
    }

    let addTaskButtonList = document.querySelectorAll('.add-subtask-button')
    for (let i=0; i < addTaskButtonList.length; i++) {
        addTaskButtonList[i].addEventListener("click", function (event) {
        addSubTask(event.target.parentNode.parentNode.parentNode)
        })
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

// Close a box
openBox.addEventListener('click', function (event) {
    const classNameofClickedElement = event.target.classList[0]
    const classNames = ['close-box', 'wrapper']
    const shouldCloseBox = classNames.some(className => className === classNameofClickedElement)
    if (shouldCloseBox) {
        openBox.style.display = 'none'
        document.querySelector('body').style.overflow = 'scroll'
    }
})


// Create a new task inside a box
document.getElementById('box-content').addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask(event.target.parentNode.parentNode.querySelector('h3').innerHTML,event.target.parentNode.parentNode)
    }
})

// Close a box
openBox.addEventListener('click', function (event) {
    const classNameofClickedElement = event.target.classList[0]
    const classNames = ['close-box', 'wrapper']
    const shouldCloseBox = classNames.some(className => className === classNameofClickedElement)
    if (shouldCloseBox) {
        openBox.style.display = 'none'
        document.querySelector('body').style.overflow = 'scroll'
    }
})